"use client";

import { useEffect, useRef } from "react";
import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviews, ReviewPage } from "@/lib/firebase/getReviews";
import ReviewText from "../ui/review/ReviewText";
import ReviewInfo from "../ui/review/ReviewInfo";
import ReviewHeader from "../ui/review/ReviewHeader";

type PageParam = Date | null;

export default function ReviewFeed({
  initialPage,
}: {
  initialPage: ReviewPage;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery<
      ReviewPage,
      Error,
      InfiniteData<ReviewPage>,
      QueryKey,
      PageParam
    >({
      queryKey: ["reviews"],
      queryFn: ({ pageParam }) => getReviews(pageParam),
      initialPageParam: null,
      initialData: {
        pages: [initialPage],
        pageParams: [null],
      },
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
