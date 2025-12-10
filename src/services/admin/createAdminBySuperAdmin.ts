/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { createAdminZodSchema } from "@/zod/admin/admin.validation";

export default async function createAdmin(_currentState: any, formData: FormData) {
  try {
    const adminData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      role: formData.get("role"),
    };

    // Validate
    const validated = createAdminZodSchema.safeParse(adminData);

    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }


    const res = await serverFetch.post(
      "admin/create-admin",
      {
        body: JSON.stringify(validated.data),
        headers: { "Content-Type": "application/json" },
      },
      "adminAccess"
    );

    const result = await res.json();
    return result;
  } catch (error) {
    const err = error as any;

    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Failed to create admin. Please try again.",
    };
  }
}
