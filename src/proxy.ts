// middleware.ts
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function proxy(req: Request) {
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return res;
}

// don’t touch _next assets
export const config = {
  matcher: ["/", "/((?!_next/|favicon.ico).*)"],
};
