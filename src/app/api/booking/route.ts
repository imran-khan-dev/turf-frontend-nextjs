// app/api/booking/route.ts
import { NextResponse } from "next/server";
import serverFetch from "@/lib/server-fetch";
import { getCookie } from "@/services/auth/tokenHandlers"; // if you need cookie-based auth server-side

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("next aPi", body)
        // body: { turfProfileId, turfFieldId, startTimeISO, endTimeISO }

        // Optionally get token from cookie (server-side) to send to backend if needed:
        // const token = getCookie('turfUserAccess'); // ensure your getCookie works server-side
        // attach token if backend needs cookie/auth

        // Create booking by calling your Node backend
        const res = await serverFetch.post("booking/make-booking", {
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
        }, "turfUserAccess");
        const json = await res.json();

        console.log("next apiresult", json)
        // forward whatever your backend returns (success,/data/message)
        return NextResponse.json(json, { status: res.status });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
