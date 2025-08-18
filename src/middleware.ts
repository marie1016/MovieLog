import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;
  const authPage = ["/login", "/signup"];
  const myPage = ["/addReview", "/myPage"];

  // 로그인하지 않은 사용자의 접근 차단
  if (!sessionCookie && myPage.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 로그인된 사용자의 접근 차단
  if (sessionCookie && authPage.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
