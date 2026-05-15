import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-utamv-os", "campus-sot");
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/map/:path*", "/commerce/:path*", "/api/:path*"],
};
