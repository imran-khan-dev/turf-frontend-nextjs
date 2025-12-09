import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1/";

// Define allowed token types
type AccessTokenType = "ownerAccess" | "managerAccess" | "turfUserAccess" | "adminAccess";

// Helper function to make requests with dynamic token
const serverFetchHelper = async (
    endpoint: string,
    options: RequestInit,
    tokenType: AccessTokenType = "turfUserAccess" // default token
): Promise<Response> => {
    const { headers, ...restOptions } = options;


    // get the correct access token from cookies
    const accessToken = await getCookie(tokenType);

    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
        headers: {
            ...headers,
            ...(accessToken ? { Cookie: `${tokenType}=${accessToken}` } : {}),
            // ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        ...restOptions,
    });

    return response;

};





// Expose methods for HTTP verbs
export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}, tokenType?: AccessTokenType) =>
        serverFetchHelper(endpoint, { ...options, method: "GET" }, tokenType),

    post: async (endpoint: string, options: RequestInit = {}, tokenType?: AccessTokenType) =>
        serverFetchHelper(endpoint, { ...options, method: "POST" }, tokenType),

    put: async (endpoint: string, options: RequestInit = {}, tokenType?: AccessTokenType) =>
        serverFetchHelper(endpoint, { ...options, method: "PUT" }, tokenType),

    patch: async (endpoint: string, options: RequestInit = {}, tokenType?: AccessTokenType) =>
        serverFetchHelper(endpoint, { ...options, method: "PATCH" }, tokenType),

    delete: async (endpoint: string, options: RequestInit = {}, tokenType?: AccessTokenType) =>
        serverFetchHelper(endpoint, { ...options, method: "DELETE" }, tokenType),
};

export default serverFetch;