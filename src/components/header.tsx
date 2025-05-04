"use client";

import auth from "@/firebase";
import { RootState } from "@/lib/store";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

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
      <div>{user ? `${user.displayName}` : "로그인"}</div>
    </div>
  );
}
