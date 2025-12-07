/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"


import { getCookie } from "@/services/auth/tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getTokenTypeFromPath } from "../getTokenType";


export const getUserInfo = async (): Promise<UserInfo | null> => {

    try {
        const pathname = request.nextUrl.pathname;
        const tokenType = getTokenTypeFromPath(pathname);

        const accessToken = await getCookie(tokenType);

        if (!accessToken) {
            return null;
        }

        const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

        if (!verifiedToken) {
            return null;
        }

        const userInfo: UserInfo = {
            name: verifiedToken.name || "Unknown User",
            email: verifiedToken.email,
            role: verifiedToken.role,
        };

        return userInfo;
    } catch (error: any) {
        console.log(error);
        return null;
    }

}