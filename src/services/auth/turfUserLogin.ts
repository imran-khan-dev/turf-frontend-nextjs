/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { parse } from "cookie";
import { setCookie } from "./tokenHandlers";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth/auth.validation";
import { redirect } from "next/navigation";

const turfUserlogin = async (_currentState: any, formData: any) => {
  try {
    // Extract form data
    const email = formData.get("email");
    const password = formData.get("password");
    const turfProfileSlug = formData.get("turfProfileSlug");
    const redirectTo = formData.get("redirect") as string | null;

    if (!turfProfileSlug) {
      return { success: false, message: "Missing turf profile slug" };
    }

    // Validate email/password
    const validation = zodValidator(
      { email, password },
      loginValidationZodSchema
    );
    if (!validation.success) return validation;

    // Prepare request body
    const body = JSON.stringify({
      ...validation.data,
      turfProfileSlug,
    });

    // Call backend Turf User login API
    const res = await serverFetch.post("auth/login/turf-user", {
      body,
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (!result.success) {
      throw new Error(result.message || "Login failed");
    }

    // Parse Set-Cookie headers
    const setCookieHeaders = res.headers.getSetCookie();
    if (!setCookieHeaders) throw new Error("Backend did not send cookies");

    let accessParsed: any = null;
    let refreshParsed: any = null;

    setCookieHeaders.forEach((cookieStr: string) => {
      const parsed = parse(cookieStr);
      if (parsed["turfUserAccess"]) accessParsed = parsed;
      if (parsed["turfUserRefresh"]) refreshParsed = parsed;
    });

    if (!accessParsed || !refreshParsed) {
      throw new Error("Missing turfUser cookies");
    }

    // Set cookies
    await setCookie("turfUserAccess", accessParsed["turfUserAccess"], {
      httpOnly: true,
      secure: true,
      path: accessParsed["Path"] ?? "/",
      maxAge: Number(accessParsed["Max-Age"] ?? "3600"),
      sameSite: accessParsed["SameSite"] ?? "strict",
    });

    await setCookie("turfUserRefresh", refreshParsed["turfUserRefresh"], {
      httpOnly: true,
      secure: true,
      path: refreshParsed["Path"] ?? "/",
      maxAge: Number(refreshParsed["Max-Age"] ?? 3600 * 24 * 90),
      sameSite: refreshParsed["SameSite"] ?? "strict",
    });

    // Redirect after successful login
    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      redirect(`${requestedPath}?loggedIn=true`);
    } else {
      // Default redirect to turf-user dashboard
      redirect(`/${turfProfileSlug}/user-dashboard?loggedIn=true`);
    }
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;

    console.error("Turf User Login Error:", err);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Turf user login failed.",
    };
  }
};

export default turfUserlogin;
