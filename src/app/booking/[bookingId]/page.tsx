import serverFetch from "@/lib/server-fetch";
import Link from "next/link";
import { redirect } from "next/navigation";

async function createPayment(paymentId: string) {
  "use server";

  const body = JSON.stringify({ paymentId });

  const payNowRes = await serverFetch.post(
    `payment/make-payment`,
    {
      body,
      headers: { "Content-Type": "application/json" },
    },
    "turfUserAccess"
  );

  const json = await payNowRes.json();
  return json.url;
}

export default async function BookingPage({
  params,
}: {
  params: { bookingId: string };
}) {
  const { bookingId } = await params;

  const res = await serverFetch.get(`booking/get-booking/${bookingId}`); // adapt to your endpoint
  if (!res.ok) return <div>Booking not found</div>;
  const json = await res.json();
  const booking = json.data;


  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Booking #{booking.id}</h1>
      <p>
        Status: <strong>{booking.status}</strong>
      </p>
      <p>
        Payment: <strong>{booking.paymentStatus}</strong>
      </p>
      <p>Start: {new Date(booking.startTime).toLocaleString()}</p>
      <p>End: {new Date(booking.endTime).toLocaleString()}</p>
      <p>Amount: {booking.paymentAmount} ৳</p>

      {booking.paymentStatus === "PENDING" && (
        <form
          action={async () => {
            "use server";
            const url = await createPayment(booking.payment.id);
            // Redirect user to gateway after generating URL
            return redirect(url);
          }}
          className="mt-4"
        >
          <button
            type="submit"
            className="bg-[#1A80E3] text-white px-4 py-2 rounded"
          >
            Pay Now
          </button>
        </form>
      )}
    </div>
  );
}
