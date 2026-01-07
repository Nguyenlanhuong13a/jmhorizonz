import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Strict typing for token properties if needed, or simple existence check
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Admin Protection
        if (path.startsWith("/admin") && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // Profile Protection
        if (path.startsWith("/profile") && !token) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;

                // Allow public access to auth routes to prevent loops
                if (path.startsWith("/auth") || path.startsWith("/api/auth")) {
                    return true;
                }

                // Protected routes
                if (path.startsWith("/admin") || path.startsWith("/profile") || path.startsWith("/checkout")) {
                    return !!token;
                }

                return true;
            },
        },
        pages: {
            signIn: "/auth/login",
            error: "/auth/error",
        }
    }
);

export const config = {
    matcher: [
        "/admin/:path*",
        "/profile/:path*",
        "/checkout/:path*",
        // Explicitly Match protected roots if needed, but the logic above handles it. 
        // We avoid matching /api/auth globally to let next-auth handle it, 
        // but strict matcher helps performance.
    ],
};
