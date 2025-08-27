"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import UserMenu from "./UserMenu";
import SearchReviews from "./SearchReviews";

export default function MainHeader() {
  const { user, isLoading } = useSelector((state: RootState) => state.user);

  let content;

  if (user) {
    content = <UserMenu user={user} />;
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
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-10 lg:px-16">
        <Link href="/" className="font-jetBrainsMono text-2xl">
          MovieLog
        </Link>
        {isLoading ? null : (
          <nav className="flex items-center gap-2 text-base font-semibold sm:gap-7">
            <SearchReviews />
            <div className="relative flex gap-7 text-blue">{content}</div>
          </nav>
        )}
      </div>
    </header>
  );
}
