import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    phone?: string;
    photo?: string;
    role: string;
    turfProfileId?: string; // for turf-user & manager
    iat?: number;
    exp?: number;
}

export function getUserFromToken(token: string): AuthUser | null {
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        if (!decoded || typeof decoded === "string") return null;

        console.log("decodedToken", decoded)


        return {
            id: decoded.userId,
            email: decoded.email,
            name: decoded.name,
            phone: decoded.phone? decoded.phone: undefined,
            photo: decoded.photo? decoded.photo: undefined,
            role: decoded.role? decoded.role: undefined,
            turfProfileId: decoded.turfProfileId ? decoded.turfProfileId : undefined,
            iat: decoded.iat,
            exp: decoded.exp,
        };
    } catch (err) {
        return null; // Token invalid or expired
    }
}
