import { db } from "@/lib/firebase/firebase";
import { User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const saveUser = async (user: User) => {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    createdAt: serverTimestamp(),
  });
};
