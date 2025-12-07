import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromToken } from "@/lib/auth/getUserFromToken";

export default async function ManagerDashboardLayout({ children }) {
  const token = cookies().get("managerAccess")?.value;

  if (!token) return redirect("/login");

  const user = getUserFromToken(token);

  if (!user || user.role !== "manager") {
    return redirect("/login");
  }

  return (
    <div className="flex h-screen">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col">
        <ManagerNavbar user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
