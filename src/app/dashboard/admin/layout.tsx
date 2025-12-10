import DashboardShell from "@/components/modules/Dashboard/DashboardShell";
import { getUserFromToken } from "@/services/auth/getUserFromToken";
import { getCookie } from "@/services/auth/tokenHandlers";

function mapRole(tokenRole: string | undefined) {
  if (!tokenRole) return null;

  const roleMap: Record<string, "owner" | "manager" | "turfUser" | "admin"> = {
    OWNER: "owner",
    MANAGER: "manager",
    ADMIN: "admin",
    SUPER_ADMIN: "admin",
    TURF_USER: "turfUser",
  };

  return roleMap[tokenRole] ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function DashboardLayout({ children }: any) {
  const accessToken = await getCookie("adminAccess");
  const user = accessToken ? getUserFromToken(accessToken) : null;

  const role = mapRole(user?.role);

  return (
    <DashboardShell user={user} role={role}>
      {children}
    </DashboardShell>
  );
}
