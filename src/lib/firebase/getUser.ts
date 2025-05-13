import { cookies } from "next/headers";
import { adminAuth } from "./firebaseAdmin";

export async function getUser() {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie);
    const user = await adminAuth.getUser(decoded.uid);
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
