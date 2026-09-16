import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 renamed middleware.ts → proxy.ts.
 * This file runs on the server before a page renders.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /shop and /shop/1 are aliases of /products and /products/1
  if (pathname === "/shop" || pathname.startsWith("/shop/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/shop/, "/products") || "/products";
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.headers.set("x-northline-path", pathname);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
