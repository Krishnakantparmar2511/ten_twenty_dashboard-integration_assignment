import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function  middleware(request: NextRequest) {
 

  const token = request.cookies.get("accessToken")?.value;
 
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard", "/timesheet"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isLoginPage = pathname.startsWith("/login");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }


  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], 
};
