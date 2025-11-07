"use client";

import { Review } from "@/types/addReview";
import { useQuery } from "@tanstack/react-query";
import { getReviewById } from "@/lib/firebase/getReviewById";
import ReviewText from "../ui/review/ReviewText";
import ReviewHeader from "../ui/review/ReviewHeader";
import ReviewInfo from "../ui/review/ReviewInfo";
import SkeletonReviewHeader, {
  SkeletonReviewInfo,
} from "../skeleton/SkeletonReviewDetail";

interface ReviewDetailProps {
  id: string;
  reviewById: Review | null;
}

export default function ReviewDetail({ id, reviewById }: ReviewDetailProps) {
  const {
    data: review,
    error,
    isFetching,
  } = useQuery<Review | null>({
    queryKey: ["reviewById"],
    queryFn: async () => getReviewById(id),
    initialData: reviewById,
  });

  if (isFetching)
    return (
      <>
        <SkeletonReviewHeader variant="detail" />
        <SkeletonReviewInfo size="lg" />
      </>
    );
  if (error) throw error;
  if (!review) return null;

  return (
    <>
      <ReviewHeader {...review} variant="detail" />
      <ReviewInfo {...review} size="lg" />
      <ReviewText {...review} variant="detail" />
    </>
  );
}
