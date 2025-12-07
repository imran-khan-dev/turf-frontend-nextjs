import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function DashboardEntry() {
  const store = await cookies();
  if (store.get("adminAccess")) return redirect("/dashboard/admin");
  if (store.get("managerAccess")) return redirect("/dashboard/manager");
  if (store.get("ownerAccess")) return redirect("/dashboard/owner");
  if (store.get("turfUserAccess")) return redirect("/dashboard/user");
  return redirect("/login");
}
