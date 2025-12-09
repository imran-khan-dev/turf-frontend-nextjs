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

      let redirect = "/?loggedOut=true"; // default

      if (role === "turfUser") {
        // extract turfProfileSlug from current path
        const pathSegments = window.location.pathname
          .split("/")
          .filter(Boolean);
        const turfProfileSlug = pathSegments[0];
        redirect = `/${turfProfileSlug}/turf-user/login?loggedOut=true`;
      }

      router.push(redirect);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     await logoutUser(role);
  //     router.push("/?loggedOut=true");
  //   } catch (err) {
  //     console.error("Logout failed:", err);
  //   }
  // };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}
