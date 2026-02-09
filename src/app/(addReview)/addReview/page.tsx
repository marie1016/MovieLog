"use client";

import SearchMovies from "@/components/addReview/SearchMovies";
import { getMyReviews } from "@/lib/firebase/getMyReviews";
import { RootState } from "@/lib/store";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Suspense } from "react";
import { useSelector } from "react-redux";

export default function AddReviewPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const displayName = user?.displayName || "";

  const { data: reviewsData } = useQuery({
    queryKey: ["myReviews"],
    queryFn: () => getMyReviews(displayName),
    enabled: !!user,
  });

  // 내 최신 리뷰 영화ID 3개 받아오기
  const recentMovieIds =
    reviewsData?.slice(0, 3).map((reviewData) => reviewData.movieId) ?? [];

  const { data: recommendedMovies } = useQuery<Movie[]>({
    queryKey: ["recommendedMovies", recentMovieIds],
    queryFn: () =>
      fetch(
        `/api/recommendedMovies?recentMovieIds=${recentMovieIds.join(",")}`,
      ).then((res) => res.json()),
    enabled: recentMovieIds.length > 0,
    staleTime: 1000 * 60 * 10,
  });

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
        <SearchMovies recommendedMovies={recommendedMovies} />
      </Suspense>
    </main>
  );
}
