import { z } from "zod";

export const createAdminZodSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),

    email: z
        .string()
        .min(5, "Email must be at least 5 characters")
        .max(100, "Email too long")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
            message: "Invalid email format",
        }),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[A-Z])/, "Must contain uppercase letter")
        .regex(/^(?=.*\d)/, "Must contain number")
        .regex(/^(?=.*[!@#$%^&*])/, "Must contain special character"),

    phone: z
        .string()
        .optional(),
    role: z.string().min(1, "Role is required"),
});
