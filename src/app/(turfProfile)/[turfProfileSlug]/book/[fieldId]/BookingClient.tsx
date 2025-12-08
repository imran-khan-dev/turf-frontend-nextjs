/* eslint-disable @typescript-eslint/no-explicit-any */
// BookingClient.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/services/auth/tokenHandlers";
import Link from "next/link";

export default function BookingClient({ field, turfProfileSlug }: any) {
  const router = useRouter();
  const [date, setDate] = useState<string>(""); // YYYY-MM-DD
  const [slots, setSlots] = useState<any[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch slots when date changes
  useEffect(() => {
    if (!date) {
      setSlots([]);
      setSelectedSlot(null);
      return;
    }
    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        // Call Next API route (server-side) which proxies to your Node backend
        const res = await fetch(`/api/slots?fieldId=${field.id}&date=${date}`);
        const json = await res.json();
        setSlots(json || []);
      } catch (err) {
        console.error(err);
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [date, field.id]);

  const handleConfirmBooking = async () => {
    if (!selectedSlot) {
      setError("Please pick a slot");
      return;
    }
    setError(null);
    setBookingLoading(true);
    console.log("fieldinBooking", field);

    try {
      const body = {
        turfProfileId: field.turfProfileId,
        turfFieldId: field.id,
        startISO: selectedSlot.startISO,
        endISO: selectedSlot.endISO,
      };

      const res = await fetch(`/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.message || "Booking failed");
        setBookingLoading(false);
        return;
      }

      // Expect backend (Node) returned booking id in json.data.id
      const bookingId = json.data?.booking?.id;
      if (bookingId) {
        router.push(`/booking/${bookingId}`);
      } else {
        setError("Booking created but response missing booking id");
      }
    } catch (err) {
      console.error(err);
      setError("Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  //   const accessToken = getCookie("turfUserAccess");
  //   if (!accessToken) {
  //     return (
  //       <div className="text-center p-8">
  //         <p className="mb-4 text-lg">Please login to book a slot</p>
  //         <Link
  //           href={`/${turfProfileSlug}/turf-user/login`}
  //           className="bg-[#1A80E3] hover:bg-blue-700 text-white px-4 py-2 rounded"
  //         >
  //           Login
  //         </Link>
  //       </div>
  //     );
  //   }
  console.log("clientSlots", slots);

  console.log("seletectSlot", selectedSlot);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A80E3]">{field.name}</h1>
        <p className="text-gray-700">{field.description}</p>
        <p className="mt-2">
          Price per slot: <strong>{field.pricePerSlot} ৳</strong>
        </p>
        <p>
          Slot duration: {field.slotDuration || field.slotDurationInMinutes}{" "}
          minutes
        </p>
      </div>

      <div>
        <label className="block font-semibold mb-2">Select date</label>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Available slots</h3>
        {loadingSlots && <p>Loading slots...</p>}
        {!loadingSlots && date && slots.length === 0 && (
          <p>No slots available for this date.</p>
        )}

        <div className="grid grid-cols-2 gap-3">
          {slots.map((slot: any) => {
            const isSelected = selectedSlot?.startISO === slot.startISO;
            return (
              <button
                key={slot.startISO}
                disabled={!slot.status}
                onClick={() => setSelectedSlot(slot)}
                className={`p-2 rounded border text-sm ${
                  isSelected
                    ? "bg-[#1A80E3] text-white"
                    : slot.status
                    ? "bg-green-50 hover:bg-green-100"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
              >
                {slot.start} — {slot.end}
              </button>
            );
          })}
        </div>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <Button
          onClick={handleConfirmBooking}
          disabled={!selectedSlot || bookingLoading}
          className="w-full bg-[#1A80E3] hover:bg-blue-700 text-white"
        >
          {bookingLoading ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
}
