import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-cookie";

function isAdminRoute(pathname) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

async function getSessionUser(request) {
  const response = await fetch(new URL("/api/auth/session", request.url), {
    headers: {
      cookie: request.headers.get("cookie") || ""
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return null;
  }

  const { user } = await response.json();
  return user || null;
}

function redirectToLogin(request, pathname) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!request.cookies.get(SESSION_COOKIE)?.value) {
    return redirectToLogin(request, pathname);
  }

  const user = await getSessionUser(request);

  if (!user) {
    const response = redirectToLogin(request, pathname);
    response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  }

  if (isAdminRoute(pathname) && !user.isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/account";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/admin/:path*"]
};
