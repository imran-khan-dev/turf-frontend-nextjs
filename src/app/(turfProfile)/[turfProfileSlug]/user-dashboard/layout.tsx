/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardShell from "@/components/modules/Dashboard/DashboardShell";
import { getUserFromToken } from "@/services/auth/getUserFromToken";
import { getCookie } from "@/services/auth/tokenHandlers";

function mapRole(tokenRole: string | undefined) {
  if (!tokenRole) return null;

  const roleMap: Record<string, "owner" | "manager" | "turfUser" | "admin"> = {
    OWNER: "owner",
    MANAGER: "manager",
    ADMIN: "admin",
    TURF_USER: "turfUser",
  };

  return roleMap[tokenRole] ?? null;
}

export default async function DashboardLayout({ children, params }: any) {
  const { turfProfileSlug } = await params;

  const accessToken = await getCookie("turfUserAccess");
  const user = accessToken ? getUserFromToken(accessToken) : null;

  const role = mapRole(user?.role);

  return (
    <DashboardShell user={user} role={role} turfProfileSlug={turfProfileSlug}>
      {children}
    </DashboardShell>
  );
}
