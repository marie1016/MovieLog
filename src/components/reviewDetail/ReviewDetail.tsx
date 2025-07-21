"use client";

import ReviewCard from "@/components/addReview/ReviewCard";
import { ReviewPage } from "@/lib/firebase/getReviews";
import { useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";

export default function ReviewDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const reviews: InfiniteData<ReviewPage> | undefined =
    queryClient.getQueryData(["reviews"]);
  const allReviews = reviews?.pages.flatMap((p) => p.reviewsData);
  const review = allReviews?.find((r) => r.id === id);

  if (!review) return null;

  return <ReviewCard {...review} feed detail />;
}
