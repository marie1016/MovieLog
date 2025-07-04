"use client";

import { useEffect, useRef } from "react";
import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviews, ReviewPage } from "@/lib/firebase/getReviews";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import ReviewCard from "../addReview/ReviewCard";

type PageParam = QueryDocumentSnapshot<DocumentData> | null;

export default function ReviewFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery<
      ReviewPage,
      Error,
      InfiniteData<ReviewPage>,
      QueryKey,
      PageParam
    >({
      queryKey: ["reviews"],
      queryFn: (ctx) => getReviews(ctx.pageParam),
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 0,
      gcTime: 1000 * 60 * 10,
    });

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 justify-between gap-12 md:grid-cols-[repeat(2,_minmax(280px,_1fr))] md:gap-14">
      {data?.pages.map((page) =>
        page.reviewsData.map((review) => (
          <div key={review.id}>
            <ReviewCard
              id={review.id}
              userName={review.userName}
              posterPath={review.posterPath}
              title={review.title}
              genres={review.genres}
              runtime={review.runtime}
              voteAverage={review.voteAverage}
              date={review.date}
              review={review.review}
              createdAt={review.createdAt}
              feed
            />
          </div>
        )),
      )}
      <div ref={ref} className="h-10" />
    </div>
  );
}
