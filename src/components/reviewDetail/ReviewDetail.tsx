"use client";

import { Review } from "@/types/addReview";
import { useQuery } from "@tanstack/react-query";
import { getReviewById } from "@/lib/firebase/getReviewById";
import ReviewText from "../ui/review/ReviewText";
import ReviewHeader from "../ui/review/ReviewHeader";
import ReviewInfo from "../ui/review/ReviewInfo";

export default function ReviewDetail({ id }: { id: string }) {
  const { data: review } = useQuery<Review | null>({
    queryKey: ["reviewById"],
    queryFn: async () => getReviewById(id),
  });

  if (!review) return null;

  return (
    <>
      <ReviewHeader {...review} variant="detail" />
      <ReviewInfo {...review} size="lg" />
      <ReviewText {...review} variant="detail" />
    </>
  );
}
