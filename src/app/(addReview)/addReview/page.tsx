"use client";

import SearchMovies from "@/components/addReview/SearchMovies";
import Image from "next/image";
import { Suspense } from "react";

export default function AddReviewPage() {
  return (
    <main>
      <h1 className="mb-6 text-2xl font-medium">영화 검색</h1>
      <Suspense
        fallback={
          <Image
            src="/images/dots-rotate.svg"
            width={60}
            height={60}
            alt="로딩스피너"
            className="mx-auto mt-36"
          />
        }
      >
        <SearchMovies />
      </Suspense>
    </main>
  );
}
