import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviews, ReviewPage } from "@/lib/firebase/getReviews";

type PageParam = Date | null;

export const useInfiniteReviewFeed = (initialPage: ReviewPage) =>
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
