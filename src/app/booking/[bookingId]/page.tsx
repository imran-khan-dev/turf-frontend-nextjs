// app/booking/[bookingId]/page.tsx
import serverFetch from "@/lib/server-fetch";
import Link from "next/link";

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

  const paymentId = booking?.payment?.id;

  console.log("pay", paymentId);

  const body = JSON.stringify({
    paymentId: paymentId,
  });

  const payNowRes = await serverFetch.post(
    `payment/make-payment`,
    {
      body,
      headers: { "Content-Type": "application/json" },
    },
    "turfUserAccess"
  );

  const payNowLink = await payNowRes.json();
  console.log("payNow", payNowLink.url);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Booking #{booking.id}</h1>
      <p>
        Status: <strong>{booking.status}</strong>
      </p>
      <p>
        Payment: <strong>{booking.paymentStatus}</strong>
      </p>
      <p>Field: {booking.turfFieldName}</p>
      <p>Start: {new Date(booking.startTime).toLocaleString()}</p>
      <p>End: {new Date(booking.endTime).toLocaleString()}</p>
      <p>Amount: {booking.paymentAmount} ৳</p>

      {booking.paymentStatus === "PENDING" && (
        <div className="mt-4">
          {/* Redirect to your payment gateway using booking.id & amount */}
          <a
            href={payNowLink.url}
            className="inline-block bg-[#1A80E3] text-white px-4 py-2 rounded"
          >
            Pay Now
          </a>
        </div>
      )}
    </div>
  );
}
