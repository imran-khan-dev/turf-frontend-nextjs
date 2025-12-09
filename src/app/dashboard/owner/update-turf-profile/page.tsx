import TurfProfileUpdateForm from "@/components/modules/TurfProfile/UpdateTurfProfileForm";
import serverFetch from "@/lib/server-fetch";

export default async function UpdateTurfProfilePage() {
  const res = await serverFetch.get("user/my-turf-profile", {}, "ownerAccess");
  const data = await res.json();

  const turfProfileId = data?.data?.[0]?.id;
  const turfProfileSlug = data?.data?.[0]?.slug;

  return (
    <div>
      <TurfProfileUpdateForm profileId={turfProfileId} profileSlug={turfProfileSlug } />
    </div>
  );
}
