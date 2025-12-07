import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { getUserFromToken } from "@/lib/auth/getUserFromToken";
import OwnerSidebar from "@/components/modules/dashboard/sidebar/OwnerSidebar";
import OwnerNavbar from "@/components/modules/dashboard/navbar/OwnerNavbar";

export default async function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("ownerAccess")?.value;

  if (!token) return redirect("/login");

  // const user = getUserFromToken(token);
  const user = "owner";

  // if (!user || user.role !== "owner") {
  //   return redirect("/login");
  // }

  return (
    <div className="flex h-screen">
      <OwnerSidebar />
      <div className="flex-1 flex flex-col">
        <OwnerNavbar user={user} />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
}
