export type UserRole = "OWNER" | "MANAGER" | "ADMIN" | "SUPER_ADMIN" | "TURF_USER" | "COMMON" | null;

// Determine which role owns a given route
export function getRouteOwner(pathname: string): UserRole {
  const segments = pathname.split("/").filter(Boolean);
  // For turf user dashboard: ["dhanmonddi-turf", "user-dashboard"]

  if (pathname.startsWith("/dashboard/admin")) return "ADMIN";
  if (pathname.startsWith("/dashboard/owner")) return "OWNER";
  if (pathname.startsWith("/dashboard/manager")) return "MANAGER";

  // turf user dashboard → /{slug}/user-dashboard
  if (segments.length >= 2 && segments[1] === "user-dashboard") {
    return "TURF_USER";
  }

  // shared dashboard routes
  if (pathname.startsWith("/dashboard")) return "COMMON";

  return null; // public
}


// Detect auth pages
export function isAuthRoute(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);

  // turf-user login → /{slug}/turf-user/login
  if (segments.length === 3 && segments[1] === "turf-user" && segments[2] === "login") {
    return true;
  }

  return [
    "/owner/login",
    "/owner/register",
    "/manager/login",
    "/admin/login",
  ].some((route) => pathname.startsWith(route));
}

// Default dashboard route per role
export function getDefaultDashboardRoute(role: UserRole, slug?: string) {
  switch (role) {
    case "OWNER":
      return "/dashboard/owner";
    case "MANAGER":
      return "/dashboard/manager";
    case "ADMIN":
      return "/dashboard/admin";
    case "SUPER_ADMIN":
      return "/dashboard/admin";
    case "TURF_USER":
      return slug ? `/${slug}/user-dashboard` : "/"; // fallback
    default:
      return "/";
  }
}


export function getLoginUrlFromTokenType(tokenType: string, pathname: string): string {
  if (tokenType === "turfUserAccess") {
    // Turf user login path: /{turfProfileSlug}/turf-user/login
    const segments = pathname.split("/").filter(Boolean); // remove empty segments
    const turfProfileSlug = segments[0] || "wrong-slug";
    return `/${turfProfileSlug}/turf-user/login`;
  }

  // Other roles
  const TOKEN_LOGIN_MAP: Record<string, string> = {
    adminAccess: "/admin/login",
    ownerAccess: "/owner/login",
    managerAccess: "/owner/login",
  };

  return TOKEN_LOGIN_MAP[tokenType] || "/owner/login";
}


