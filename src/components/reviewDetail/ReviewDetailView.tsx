"use client";

import { Review } from "@/types/addReview";
import { useQuery } from "@tanstack/react-query";
import { getReviewById } from "@/lib/firebase/getReviewById";
import ReviewItem from "../ui/review/ReviewItem";

interface ReviewDetailProps {
  id: string;
  reviewById: Review | null;
}

export default function ReviewDetailView({
  id,
  reviewById,
}: ReviewDetailProps) {
  const {
    data: review,
    error,
    isFetching,
  } = useQuery<Review | null>({
    queryKey: ["reviewById"],
    queryFn: async () => getReviewById(id),
    initialData: reviewById,
    staleTime: 1000 * 60 * 5,
  });

  if (error) throw error;
  if (!review) return null;

  return <ReviewItem size="lg" isFetching={isFetching} review={review} />;
}
