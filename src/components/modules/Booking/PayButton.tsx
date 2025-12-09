"use client";

import { useState } from "react";

export default function PayButton({ paymentId }: { paymentId: string }) {
  const [loading, setLoading] = useState(false);

  const handlePayNow = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/payment/make-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId }),
      });

      const data = await res.json();

      // redirect to the PG link
      window.location.href = data.url;
    } catch (err) {
      console.error("Payment failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayNow}
      disabled={loading}
      className="inline-block bg-[#1A80E3] text-white px-4 py-2 rounded"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
