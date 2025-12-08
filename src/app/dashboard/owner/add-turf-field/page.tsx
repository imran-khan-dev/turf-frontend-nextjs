import TurfFieldForm from "@/components/modules/TurfField/AddTurfFieldForm";
import serverFetch from "@/lib/server-fetch";

export default async function TurfFieldAddPage() {
  const res = await serverFetch.get("user/my-turf-profile", {}, "ownerAccess");
  const data = await res.json();

  console.log("profiledata", data);

  const turfProfileId = data?.data?.[0]?.id;

  return (
    <div>
      <TurfFieldForm turfProfileId={turfProfileId} />
    </div>
  );
}
