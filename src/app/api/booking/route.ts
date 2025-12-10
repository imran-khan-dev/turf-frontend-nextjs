// app/api/booking/route.ts
import { NextResponse } from "next/server";
import serverFetch from "@/lib/server-fetch";

export async function POST(request: Request) {
    try {
        const body = await request.json();
       
        const res = await serverFetch.post("booking/make-booking", {
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
        }, "turfUserAccess");
        const json = await res.json();

        return NextResponse.json(json, { status: res.status });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
