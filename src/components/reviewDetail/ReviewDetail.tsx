"use client";

import { ReviewPage } from "@/lib/firebase/getReviews";
import { Review } from "@/types/addReview";
import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import ReviewText from "../addReview/ReviewText";
import ReviewHeader from "../mainPage/ReviewHeader";
import ReviewInfo from "../mainPage/ReviewInfo";

export default function ReviewDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();

  if (isRestoring) return <p>loading</p>;

  const reviews = queryClient.getQueryData<InfiniteData<ReviewPage>>([
    "reviews",
  ]);
  const myReviews = queryClient.getQueryData<Review[]>(["myReviews"]);

  const flattenedReviews = reviews?.pages.flatMap((p) => p.reviewsData);

  const review =
    myReviews?.find((r) => r.id === id) ||
    flattenedReviews?.find((r) => r.id === id) ||
    null;

  if (!review) return null;

  return (
    <>
      <ReviewHeader {...review} variant="detail" />
      <ReviewInfo {...review} size="lg" />
      <ReviewText {...review} variant="detail" />
    </>
  );
}
