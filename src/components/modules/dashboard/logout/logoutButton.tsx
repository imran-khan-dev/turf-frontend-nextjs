"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton({ role }: { role: string }) {
  const router = useRouter();

  const logout = async () => {
    await fetch(`/api/logout?role=${role}`, { method: "POST" });
    router.push("/login");
  };

  return (
    <Button variant="destructive" onClick={logout}>
      Logout
    </Button>
  );
}

// export default async function UserDashboardLayout({ children }) {
//   const token = cookies().get("turfUserAccess")?.value;

//   if (!token) return redirect("/login");

//   const user = getUserFromToken(token);

//   if (!user || user.role !== "user") {
//     return redirect("/login");
//   }

//   return (
//     <div className="flex h-screen">
//       <UserSidebar />
//       <div className="flex-1">
//         <UserNavbar user={user} />
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// }
