import { NextResponse } from "next/server";



export function middleware(req) {
  const token = req.cookies.get("next-auth.session-token")?.value;

  // Allow access to /signin page without checking authentication
  if (req.nextUrl.pathname.startsWith("/signin") || req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Redirect if no token is found
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except public ones
export const config = {
  matcher: ["/((?!signin|_next|favicon.ico).*)"], 
};

