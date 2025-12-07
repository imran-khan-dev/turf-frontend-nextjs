"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth/logout";

export default function LogoutButton({
  role,
}: {
  role: "owner" | "manager" | "turfUser" | "admin";
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser(role); 
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}
