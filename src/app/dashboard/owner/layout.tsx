import OwnerSidebar from "@/components/modules/dashboard/sidebar/OwnerSidebar";
import OwnerNavbar from "@/components/modules/dashboard/navbar/OwnerNavbar";
import { getCookie } from "@/services/auth/tokenHandlers";
import { getUserFromToken } from "@/services/auth/getUserFromToken";

export default async function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = await getCookie("ownerAccess");

  if (!accessToken) {
    return console.log("No owner found Invalid token");
  }

  console.log("ownerAccess", accessToken);

  const user = getUserFromToken(accessToken);

  console.log("userCheck", user);

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
