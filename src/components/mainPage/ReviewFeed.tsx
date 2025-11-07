"use client";

import { useEffect, useRef } from "react";
import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getReviews, ReviewPage } from "@/lib/firebase/getReviews";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import ReviewText from "../ui/review/ReviewText";
import ReviewHeader from "../ui/review/ReviewHeader";
import ReviewInfo from "../ui/review/ReviewInfo";
import SkeletonReviewHeader, {
  SkeletonReviewInfo,
} from "../skeleton/SkeletonReviewDetail";

type PageParam = QueryDocumentSnapshot<DocumentData> | null;

export default function ReviewFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isFetching,
  } = useSuspenseInfiniteQuery<
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

  if (isFetching)
    return (
      <div className="grid grid-cols-1 justify-between gap-12 md:grid-cols-[repeat(2,_minmax(280px,_1fr))] md:gap-8">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>
            <SkeletonReviewHeader />
            <SkeletonReviewInfo />
          </div>
        ))}
      </div>
    );
  if (error) {
    throw error;
  }

  return (
    <div className="grid grid-cols-1 justify-between gap-12 md:grid-cols-[repeat(2,_minmax(280px,_1fr))] md:gap-8">
      {data?.pages.map((page) =>
        page.reviewsData.map((review) => (
          <div key={review.id}>
            <ReviewHeader {...review} />
            <ReviewInfo {...review} />
            <ReviewText {...review} />
          </div>
        )),
      )}
      <div ref={ref} className="h-10" />
    </div>
  );
}
