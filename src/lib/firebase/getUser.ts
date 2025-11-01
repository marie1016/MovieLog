import { cookies } from "next/headers";
import { adminAuth } from "./firebaseAdmin";

export async function getUser() {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie);
    const user = await adminAuth.getUser(decoded.uid);

    if (!user) {
      throw new Error(`유저정보를 불러오는 중 오류가 발생했습니다`);
    }

    return {
      uid: user.uid,
      email: user.email ?? null,
      displayName: user.displayName ?? null,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
