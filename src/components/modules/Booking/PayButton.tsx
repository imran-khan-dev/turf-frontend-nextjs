"use server";

import serverFetch from "@/lib/server-fetch";
import { redirect } from "next/navigation";

export async function payNowAction(formData: FormData) {
  const paymentId = formData.get("paymentId") as string;

  const body = JSON.stringify({ paymentId });

  const res = await serverFetch.post(
    "payment/make-payment",
    {
      body,
      headers: { "Content-Type": "application/json" },
    },
    "turfUserAccess"
  );

  const json = await res.json();

  if (!json?.url) throw new Error("Payment URL missing");

  redirect(json.url);
}
