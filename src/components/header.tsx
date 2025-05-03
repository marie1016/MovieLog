"use client";

import auth from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-[60px] bg-white">
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
