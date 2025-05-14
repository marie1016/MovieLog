import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

export async function getUser() {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decoded = await getAuth().verifySessionCookie(sessionCookie);
    const user = await getAuth().getUser(decoded.uid);
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
