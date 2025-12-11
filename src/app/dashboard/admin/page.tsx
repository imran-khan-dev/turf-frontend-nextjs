/* eslint-disable @typescript-eslint/no-explicit-any */
import StatsCards from "@/components/modules/Dashboard/DashboardCards/StatsCards";
import serverFetch from "@/lib/server-fetch";

export default async function AdminDashboardPage() {
  // ---- 1. Owners ----
  const ownersRes = await serverFetch.get(
    "user/get-owners",
    {},
    "adminAccess"
  );
  const ownersData = await ownersRes.json();
  const owners = ownersData?.data ?? [];

  // ---- 2. Turf Users ----
  const usersRes = await serverFetch.get(
    "turf-user/all-turf-users-admin",
    {},
    "adminAccess"
  );
  const usersData = await usersRes.json();
  const turfUsers = usersData?.data ?? [];

  // ---- 3. Turf Profiles count (count unique slugs) ----
  const turfSlugs = new Set(
    turfUsers?.map((u: any) => u?.turf?.slug).filter(Boolean)
  );
  const turfProfilesCount = turfSlugs.size;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      <StatsCards
        ownersCount={owners.length}
        turfUsersCount={turfUsers.length}
        turfProfilesCount={turfProfilesCount}
      />
    </div>
  );
}
