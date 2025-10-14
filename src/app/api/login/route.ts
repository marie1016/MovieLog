export const runtime = "nodejs";

// eslint-disable-next-line import/first
import { adminAuth } from "@/lib/firebase/firebaseAdmin";
// eslint-disable-next-line import/first
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("Authorization");

  const idToken = authorization?.replace(/^Bearer\s+/i, "").trim();

  if (!idToken) {
    return NextResponse.json(
      { error: "인증 토큰이 없습니다." },
      { status: 401 },
    );
  }

  try {
    await adminAuth.verifyIdToken(idToken);

    const expiresIn = 60 * 60 * 24 * 7 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    const response = NextResponse.json({ message: "로그인 성공" });

    console.log("sessionCookie 생성 완료:", !!sessionCookie);
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn / 1000,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "에러 발생" },
      {
        status: 500,
      },
    );
  }
}
