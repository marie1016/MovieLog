"use client";

import { useState } from "react";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import UserMenu from "./UserMenu";
import SearchReviews from "./SearchReviews";
import SearchReviewsModal from "../modals/SearchReviewsModal";

export default function MainHeader() {
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const isMobile = useMediaQuery("(max-Width:768px)");
  const [showSearchModal, setShowSearchModal] = useState(false);

  // 리뷰 검색창
  let searchReviews;

  if (isMobile) {
    searchReviews = (
      <button onClick={() => setShowSearchModal(true)}>
        <Image
          src="/images/search-icon.svg"
          alt="검색 아이콘"
          width={40}
          height={40}
        />
      </button>
    );
  } else {
    searchReviews = <SearchReviews width="w-72" />;
  }

  // user 표시
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

  if (showSearchModal) return <SearchReviewsModal />;

  return (
    <header className="h-[60px] w-full bg-white shadow-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-10 lg:px-16">
        <Link href="/" className="font-jetBrainsMono text-2xl">
          MovieLog
        </Link>
        {isLoading ? null : (
          <nav className="flex items-center gap-2 text-base font-semibold sm:gap-7">
            {searchReviews}
            <div className="relative flex gap-7 text-blue">{content}</div>
          </nav>
        )}
      </div>
    </header>
  );
}
