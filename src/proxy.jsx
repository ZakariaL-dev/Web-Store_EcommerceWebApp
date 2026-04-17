// Utils
import { auth } from "@/lib/auth";

// Next
import { NextResponse } from "next/server";

export default async function AccountProtection(req) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  const isProtected = pathname.startsWith("/account");
  const isAdminRoute = pathname.startsWith("/admin");

  const isBlockedPage = pathname === "/blocked";
  const isBlockedUser = !!session?.user?.blocked;

  if (isBlockedUser) {
    if (!isBlockedPage) {
      return NextResponse.redirect(new URL("/blocked", req.url));
    }
    return NextResponse.next();
  }

  if (!isBlockedUser && isBlockedPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if ((isProtected || isAdminRoute) && !session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (session) {
    const userRole = session.user.role;

    if (userRole === "admin" && pathname === "/account") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (isAdminRoute && userRole !== "admin") {
      return NextResponse.redirect(new URL("/account/profile", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
