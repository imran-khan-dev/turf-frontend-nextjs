/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { createTurfProfileValidationSchema } from "@/zod/turf/turfProfile.validation";

export const createTurfProfile = async (_currentState: any, formData: any) => {
    try {
        // Extract uploaded files
        const logo = formData.get("logo") as File | null;
        const heroImage = formData.get("heroImage") as File | null;
        const aboutImg = formData.get("aboutImg") as File | null;

        // Construct validation data for Zod
        const validationData = {
            slug: formData.get("slug"),
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            openHours: formData.get("openHours"),
            facebookLink: formData.get("facebookLink"),
            instagramLink: formData.get("instagramLink"),
            whatsappLink: formData.get("whatsappLink"),
            heroTitle: formData.get("heroTitle"),
            aboutTitle: formData.get("aboutTitle"),
            aboutDesc: formData.get("aboutDesc"),
            address: formData.get("address"),
            googleMapLink: formData.get("googleMapLink"),
            footerText: formData.get("footerText"),

            // files
            logo,
            heroImage,
            aboutImg,
        };

        // Validate using Zod
        const validated = createTurfProfileValidationSchema.safeParse(validationData);

        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message,
                })),
            };
        }

        // Build FormData for upload
        const newFormData = new FormData();
        Object.keys(validationData).forEach(key => {
            const value = (validationData as any)[key];
            if (!value) return;

            if (value instanceof File) {
                newFormData.append(key, value);
            } else {
                newFormData.append(key, value.toString());
            }
        });

        // Send API request
        const res = await serverFetch.post(
            "turf-profile/create",
            { body: newFormData },
            "ownerAccess"
        );

        const result = await res.json();

        return result;
    } catch (error) {
        const err = error as Error & { digest?: string };

        // Allow Next.js to handle redirect
        if (err?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.error("Turf Profile Error:", err);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? err.message
                    : "Failed to create Turf Profile. Please try again.",
        };
    }
};

export default createTurfProfile;
