export const runtime = "nodejs";

// eslint-disable-next-line import/first
import { adminAuth } from "@/lib/firebase/firebaseAdmin";
// eslint-disable-next-line import/first
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value || "";

  const response = NextResponse.json({ message: "로그아웃 성공" });
  response.cookies.set("session", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: new Date(0),
  });

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie);
    await adminAuth.revokeRefreshTokens(decoded.sub);
  } catch (error) {
    console.error("세션 쿠키 검증 및 만료 실패:", error);
  }
  return response;
}
