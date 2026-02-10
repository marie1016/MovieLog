"use client";

import { useEffect, useRef } from "react";
import { useInfiniteReviewFeed } from "@/hooks/queries/useInfiniteReviewFeed";
import { ReviewPage } from "@/lib/firebase/getReviews";
import ReviewItem from "../ui/review/ReviewItem";

export default function ReviewFeed({
  initialPage,
}: {
  initialPage: ReviewPage;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isFetching,
  } = useInfiniteReviewFeed(initialPage);

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
    throw error;
  }

  return (
    <div className="grid grid-cols-1 justify-between gap-12 md:grid-cols-[repeat(2,_minmax(280px,_1fr))] md:gap-8">
      {data?.pages.map((page) =>
        page.reviewsData.map((review) => (
          <div key={review.id}>
            <ReviewItem review={review} isFetching={isFetching} />
          </div>
        )),
      )}
      <div ref={ref} className="h-10" />
    </div>
  );
}
