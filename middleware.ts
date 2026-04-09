import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
