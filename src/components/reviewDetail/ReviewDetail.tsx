"use client";

import ReviewCard from "@/components/addReview/ReviewCard";
import { ReviewPage } from "@/lib/firebase/getReviews";
import { Review } from "@/types/addReview";
import { useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";

export default function ReviewDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const reviews = queryClient.getQueryData<InfiniteData<ReviewPage>>([
    "reviews",
  ]);
  const myReviews = queryClient.getQueryData<Review[]>(["myReviews"]);

  const flattenedReviews = reviews?.pages.flatMap((p) => p.reviewsData);

  const review =
    myReviews?.find((r) => r.id === id) ||
    flattenedReviews?.find((r) => r.id === id);

  if (!review) return null;

  return <ReviewCard {...review} feed detail />;
}
