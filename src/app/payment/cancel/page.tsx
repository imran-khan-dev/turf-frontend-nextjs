/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const turfProfileSlug = searchParams.get("turfProfileSlug");

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      if (!bookingId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}booking/get-booking/${bookingId}`,
          { cache: "no-store" }
        );
        const json = await res.json();

        if (json.success) setBooking(json.data);
      } catch (err) {
        console.error("Failed to fetch booking:", err);
      }

      setLoading(false);
    }

    fetchBooking();
  }, [bookingId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ❌ Payment Cancelled
        </h1>

        <p className="text-gray-700 mb-6">
          Your payment was not completed. You may try again.{" "}
        </p>

        {loading ? (
          <p className="text-gray-500 mt-4">Loading booking details...</p>
        ) : booking ? (
          <div className="mt-6 bg-gray-100 rounded-lg p-4 text-left">
            <h2 className="font-semibold mb-2">Summary</h2>
            <p>Field: {booking?.turfField?.name || "Unknown"}</p>
            <p>Amount Paid: 0 BDT</p>
            <p>Status: Pending</p>
            <p>
              Time:{" "}
              {new Date(booking.startTime).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No booking data available.</p>
        )}

        <Link
          href={`/${turfProfileSlug}`}
          className="block mt-6 w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
