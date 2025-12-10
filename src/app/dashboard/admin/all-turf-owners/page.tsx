/* eslint-disable @typescript-eslint/no-explicit-any */
import GetAllOwnersTable from "@/components/modules/Admin/GetAllOwnersTable";
import serverFetch from "@/lib/server-fetch";

export default async function AllTurfOwnersPage() {
  const res = await serverFetch.get("user/get-owners", {}, "adminAccess");
  const data = await res.json();

  const owners = data?.data ?? [];

  return (
    <div className="rounded-xl border border-[#1A80E3]/30 shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-[#1A80E3]">
        All Turf Owners
      </h2>

      <GetAllOwnersTable owners={owners} />
    </div>
  );
}
