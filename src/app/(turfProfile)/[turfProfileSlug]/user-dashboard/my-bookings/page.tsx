/* eslint-disable @typescript-eslint/no-explicit-any */
import BookingsTable from "@/components/modules/Booking/BookingsTable";
import serverFetch from "@/lib/server-fetch";

export default async function TurfUserBookingsPage() {
  const res = await serverFetch.get(
    "booking/get-bookings",
    {},
    "turfUserAccess"
  );
  const data = await res.json();

  console.log("myBooking", data);

  const bookings =
    data?.data?.bookings?.map((b: any) => ({
      id: b.id,
      itemName: b.turfField?.name ?? "Unknown Item",
      userName: b.turfUser?.name || b.user?.name || "N/A",
      startTime: b.startTime,
      endTime: b.endTime,
      paymentAmount: b.paymentAmount ?? 0,
      status: b.status ?? "UNKNOWN",
      paymentId: b.payment?.id ?? null,
    })) ?? [];

  return (
    <div className="rounded-xl border border-[#1A80E3]/30 shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-[#1A80E3]">
        All Bookings
      </h2>
      <BookingsTable initialBookings={bookings} />
    </div>
  );
}
