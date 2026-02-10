"use client";

import { Review } from "@/types/addReview";
import { useReviewById } from "@/hooks/queries/useReviewById";
import ReviewItem from "../ui/review/ReviewItem";

interface ReviewDetailProps {
  id: string;
  reviewById: Review | undefined;
}

export default function ReviewDetailView({
  id,
  reviewById,
}: ReviewDetailProps) {
  const { review, error, isFetching } = useReviewById(id, reviewById);

  if (error) throw error;
  if (!review) return null;

  return <ReviewItem size="lg" isFetching={isFetching} review={review} />;
}
