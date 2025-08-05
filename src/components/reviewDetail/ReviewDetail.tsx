"use client";

import ReviewCard from "@/components/addReview/ReviewCard";
import { ReviewPage } from "@/lib/firebase/getReviews";
import { Review } from "@/types/addReview";
import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";

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

  return <ReviewCard {...review} feed detail />;
}
