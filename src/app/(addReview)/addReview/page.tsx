"use client";

import SearchMovies from "@/components/addReview/SearchMovies";
import { Suspense } from "react";

export default function AddReviewPage() {
  return (
    <main>
      <h1 className="mb-6 text-2xl font-medium">영화 검색</h1>
      <Suspense fallback={null}>
        <SearchMovies />
      </Suspense>
    </main>
  );
}
