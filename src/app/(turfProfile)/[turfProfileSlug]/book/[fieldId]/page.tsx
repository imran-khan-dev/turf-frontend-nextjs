import serverFetch from "@/lib/server-fetch";
import BookingClient from "./BookingClient";
import { getCookie } from "@/services/auth/tokenHandlers";
import { redirect } from "next/navigation";

export default async function Page({
  params
}: {
  params: { turfProfileSlug: string; fieldId: string };
}) {
  const { turfProfileSlug, fieldId } = await params;

  const accessToken = await getCookie("turfUserAccess"); 
  if (!accessToken) {
    const redirectAfterLogin = encodeURIComponent(
      `/${turfProfileSlug}/book/${fieldId}`
    );
    const loginPath = `/${turfProfileSlug}/turf-user/login?redirect=${redirectAfterLogin}`;
    redirect(loginPath);
  }

  const fieldRes = await serverFetch.get(`turf-field/get-field/${fieldId}`);

  if (!fieldRes.ok) return <div className="p-8">Field not found</div>;
  const fieldJson = await fieldRes.json();

  const field = fieldJson.data;

  return (
    <div className="container mx-auto p-6">
      <BookingClient field={field} turfProfileSlug={turfProfileSlug} />
    </div>
  );
}
