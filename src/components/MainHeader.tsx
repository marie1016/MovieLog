"use client";

import auth from "@/lib/firebase/firebase";
import { RootState } from "@/lib/store";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function MainHeader() {
  const { user, isLoading } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await fetch("/api/logout", { method: "POST" });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  let content;

  if (user) {
    content = (
      <>
        <span>{user.displayName}</span>
        <button className="text-gray600" onClick={handleLogout}>
          로그아웃
        </button>
      </>
    );
  } else {
    content = (
      <>
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </>
    );
  }

  return (
    <header className="h-[60px] w-full bg-white shadow-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-16">
        <Link href="/" className="font-jetBrainsMono text-2xl">
          MovieLog
        </Link>
        {isLoading ? null : (
          <nav className="flex items-center gap-[30px] text-base font-semibold">
            <img src="/images/bell.svg" alt="alarm" />
            <div className="flex gap-[30px] text-blue">{content}</div>
          </nav>
        )}
      </div>
    </header>
  );
}
