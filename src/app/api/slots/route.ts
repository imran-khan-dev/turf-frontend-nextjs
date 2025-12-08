// app/api/slots/route.ts
import { NextResponse } from "next/server";
import serverFetch from "@/lib/server-fetch";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const fieldId = url.searchParams.get("fieldId");
        const date = url.searchParams.get("date");
        if (!fieldId || !date) return NextResponse.json({ message: "Missing params" }, { status: 400 });

        console.log("url", url, "fieldid", fieldId, "date", date)

        // Call your Node backend (serverFetch runs server-side)
        const res = await serverFetch.get(`booking/fields/${fieldId}/slots?date=${date}`);
        const json = await res.json();

        console.log("slotsJson", json)

        return NextResponse.json(json); // forward the { data: [...] } shape
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
