// /* eslint-disable @typescript-eslint/no-explicit-any */
// import serverFetch from "@/lib/server-fetch";
// import { getUserFromToken } from "@/services/auth/getUserFromToken";
// import { getCookie } from "@/services/auth/tokenHandlers";

// export default async function FieldPage({
//   params,
// }: {
//   params: { turfProfileSlug: string; fieldId: string };
// }) {
//   const { turfProfileSlug, fieldId } = await params;

//   console.log("field page", turfProfileSlug, fieldId);

//   let profileData: any | null = null;
//   let turfField: any | null = null;

//   try {
//     const res = await serverFetch.get(
//       `turf-profile/get-turf-profile/${turfProfileSlug}`
//     );

//     if (res.ok) {
//       const json = await res.json();
//       profileData = json.data;
//     }
//   } catch (err) {
//     console.error("Error fetching turf profile:", err);
//   }

//   console.log("profileData", profileData);

//   try {
//     const res = await serverFetch.get(`turf-field/get-field/${fieldId}`);

//     console.log("res", res);
//     if (res.ok) {
//       const json = await res.json();
//       turfField = json.data;
//     }
//   } catch (err) {
//     console.error("Error fetching turf fields:", err);
//   }

//   const { pricePerSlot, slotDuration } = turfField;

//   console.log("field", pricePerSlot, slotDuration);

//   try {
//     const res = await serverFetch.get(
//       `booking/fields/${fieldId}/slots?date=2025-12-28`
//     );

//     console.log("res", res);
//     if (res.ok) {
//       const json = await res.json();
//       turfField = json.data;
//     }
//   } catch (err) {
//     console.error("Error fetching turf fields:", err);
//   }

//   const accessToken = await getCookie("turfUserAccess");

//   if (!accessToken) {
//     return <div>Not logged in</div>;
//   }

//   const userDetails = getUserFromToken(accessToken);
//   console.log("userDetails", userDetails);
//   const userId = userDetails?.id;
//   console.log("userId", userId);

//   try {
//     const res = await serverFetch.post(`booking/make-booking`, {
//      all necesarry data here
//     });

//     console.log("res", res);
//     if (res.ok) {
//       const json = await res.json();
//       bookingdata = json.data;
//     }
//   } catch (err) {
//     console.error("Error fetching turf fields:", err);
//   }

//   return (
//     <div>
//       Field Page for {turfProfileSlug} - {fieldId}
//     </div>
//   );
// }

// app/(turfProfile)/[turfProfileSlug]/book/[fieldId]/page.tsx

import serverFetch from "@/lib/server-fetch";
import BookingClient from "./BookingClient";
import { getCookie } from "@/services/auth/tokenHandlers";
import { redirect } from "next/navigation";

interface Props {
  params: { turfProfileSlug: string; fieldId: string };
}

export default async function Page({
  params
}: {
  params: { turfProfileSlug: string; fieldId: string };
}) {
  const { turfProfileSlug, fieldId } = await params;

  const accessToken = await getCookie("turfUserAccess"); // server-side read
  if (!accessToken) {
    const redirectAfterLogin = encodeURIComponent(
      `/${turfProfileSlug}/book/${fieldId}`
    );
    const loginPath = `/${turfProfileSlug}/turf-user/login?redirect=${redirectAfterLogin}`;
    redirect(loginPath);
  }

  console.log("accetokenField", accessToken);

  console.log("fieldBook", turfProfileSlug, fieldId);

  // 1) Fetch field details (secure server-side)
  const fieldRes = await serverFetch.get(`turf-field/get-field/${fieldId}`);

  console.log("fieldRes", fieldRes);
  if (!fieldRes.ok) return <div className="p-8">Field not found</div>;
  const fieldJson = await fieldRes.json();

  console.log("fieldJson", fieldJson);
  const field = fieldJson.data;

  // 2) Optional: initial date or leave blank (no slots until user picks date)
  // We'll pass empty slots initially; BookingClient will fetch slots on date selection.

  return (
    <div className="container mx-auto p-6">
      <BookingClient field={field} turfProfileSlug={turfProfileSlug} />
    </div>
  );
}
