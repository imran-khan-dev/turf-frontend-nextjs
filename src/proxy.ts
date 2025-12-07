import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getRouteOwner,
  getDefaultDashboardRoute,
  isAuthRoute,
  UserRole,
  getLoginUrlFromTokenType,
} from "./lib/auth-utils";
import { getCookie, deleteCookie } from "./services/auth/tokenHandlers";
import { getTokenTypeFromPath } from "./lib/getTokenType";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/").filter(Boolean);

  const routeOwner = getRouteOwner(pathname);


  // Turf user slug detection
  const turfSlug = segments.length >= 1 ? segments[0] : null;

  //  Allow public pages immediately ----
  if (routeOwner === null && !isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  console.log("pathcheck", pathname)

  // ---- 2️⃣ Get token based on route type ----
  const tokenType = getTokenTypeFromPath(pathname);
  const accessToken = await getCookie(tokenType);

  console.log("tokencheck", tokenType)

  let userRole: UserRole = null;

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      if (typeof decoded === "string" || !decoded.role)
        throw new Error("Invalid token");

      userRole = decoded.role.toUpperCase() as UserRole;
    } catch {
      // Token invalid → remove it & redirect to login
      await deleteCookie(tokenType);

      const loginUrl = new URL(
        getLoginUrlFromTokenType(tokenType, pathname),
        request.url
      );
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ---- 3️⃣ If logged in & visiting an auth route → redirect away ----
  if (accessToken && isAuthRoute(pathname)) {
    const dash = getDefaultDashboardRoute(userRole, turfSlug ?? undefined);
    return NextResponse.redirect(new URL(dash, request.url));
  }

  // ---- 4️⃣ If route belongs to no role → allow ----
  if (routeOwner === null) {
    return NextResponse.next();
  }

  // ---- 5️⃣ Not logged in → redirect to login ----
  if (!accessToken) {
    const loginUrl = new URL(
      getLoginUrlFromTokenType(tokenType, pathname),
      request.url
    );
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ---- 6️⃣ Role mismatch → send to correct dashboard (loop-proof) ----
  const isSuperAdminAccessingAdmin =
    routeOwner === "ADMIN" && userRole === "SUPER_ADMIN";

  if (routeOwner !== "COMMON" && routeOwner !== userRole && !isSuperAdminAccessingAdmin) {
    const userDashboard = getDefaultDashboardRoute(
      userRole,
      turfSlug ?? undefined
    );

    // Prevent infinite redirect loop
    if (pathname === userDashboard) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(userDashboard, request.url));
  }

  // ---- 7️⃣ Generic /dashboard → go to specific dashboard ----
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    const userDashboard = getDefaultDashboardRoute(
      userRole,
      turfSlug ?? undefined
    );

    // Again ensure no loops
    if (pathname === userDashboard) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(userDashboard, request.url));
  }

  // ---- 8️⃣ Everything OK → allow ----
  return NextResponse.next();
}

// ---- Matcher ----
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.well-known).*)",
  ],
};
