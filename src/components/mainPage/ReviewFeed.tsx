"use client";

import { useEffect, useRef } from "react";
import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getReviews, ReviewPage } from "@/lib/firebase/getReviews";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import ReviewCard from "../addReview/ReviewCard";

type PageParam = QueryDocumentSnapshot<DocumentData> | null;

export default function ReviewFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useSuspenseInfiniteQuery<
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
            <ReviewCard {...review} feed />
          </div>
        )),
      )}
      <div ref={ref} className="h-10" />
    </div>
  );
}
