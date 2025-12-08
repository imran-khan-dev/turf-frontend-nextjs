/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { createTurfFieldZodSchema } from "@/zod/turf/turfField.validation";

const createTurfField = async (_prev: any, formData: FormData) => {
  try {
    // Validate fields first
    const validationData = {
      name: formData.get("name"),
      pricePerSlot: formData.get("pricePerSlot"),
      slotDuration: formData.get("slotDuration"),
      available: formData.get("available"),
      turfProfileId: formData.get("turfProfileId"),
      photos: formData.getAll("photos"), // may be empty array
    };

    const validated = createTurfFieldZodSchema.safeParse(validationData);

    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const newFormData = new FormData();
    newFormData.append("name", validationData.name as string);
    newFormData.append("pricePerSlot", (validationData.pricePerSlot as string) || "0");
    if (validationData.slotDuration) newFormData.append("slotDuration", validationData.slotDuration as string);
    if (validationData.available !== undefined) newFormData.append("available", String(validationData.available));
    newFormData.append("turfProfileId", validationData.turfProfileId as string);

    // Only append files if present
    const photos = formData.getAll("photos") as File[];
    photos.forEach((file) => {
      if (file instanceof File && file.size > 0) {
        newFormData.append("photos", file);
      }
    });

    const res = await serverFetch.post("turf-field/create", { body: newFormData }, "ownerAccess");
    const data = await res.json();

    return data;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Creation failed. Try again.",
    };
  }
};

export default createTurfField;
