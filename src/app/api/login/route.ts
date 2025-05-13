import { adminAuth } from "@/lib/firebase/firebaseAdmin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "인증 토큰이 없습니다." },
      { status: 401 },
    );
  }

  const idToken = authorization.split("Bearer")[1].trim();

  try {
    await adminAuth.verifyIdToken(idToken);

    const expiresIn = 60 * 60 * 24 * 7 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: expiresIn / 1000,
    });

    return NextResponse.json({ message: "로그인 성공" });
  } catch (error) {
    return NextResponse.json("서버 내부 오류 발생", {
      status: 500,
    });
  }
}
