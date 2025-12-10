/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";

const updateTurfUserAction = async (_prev: any, formData: FormData) => {
    try {
        const turfUserId = formData.get("turfUserId") as string;
        if (!turfUserId) return { success: false, message: "Turf User ID missing" };

        // Remove empty optional file
        const fileKeys = ["file"];
        fileKeys.forEach((key) => {
            const file = formData.get(key);
            if (!(file instanceof File) || file.size === 0) {
                formData.delete(key);
            }
        });

        const res = await serverFetch.patch(
            `turf-user/update/${turfUserId}`,
            { body: formData },
            "turfUserAccess"
        );

        const data = await res.json();

        console.log("profileUpdate", data)

        return data;
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Update failed. Try again.",
        };
    }
};

export default updateTurfUserAction;
