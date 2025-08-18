"use client";

import { ReviewPage } from "@/lib/firebase/getReviews";
import { Review } from "@/types/addReview";
import {
  useIsRestoring,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { getMyReviews } from "@/lib/firebase/getMyReviews";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import ReviewText from "../addReview/ReviewText";
import ReviewHeader from "../mainPage/ReviewHeader";
import ReviewInfo from "../mainPage/ReviewInfo";

export default function ReviewDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();
  const { user } = useSelector((state: RootState) => state.user);

  const { data } = useQuery<Review[]>({
    queryKey: ["myReviews"],
    queryFn: async () => getMyReviews(user?.displayName),
  });

  if (isRestoring) return <p>loading</p>;

  const reviews = queryClient.getQueryData<InfiniteData<ReviewPage>>([
    "reviews",
  ]);

  const flattenedReviews = reviews?.pages.flatMap((p) => p.reviewsData);

  const review =
    data?.find((r) => r.id === id) ||
    flattenedReviews?.find((r) => r.id === id);

  if (!review) return null;

  return (
    <>
      <ReviewHeader {...review} variant="detail" />
      <ReviewInfo {...review} size="lg" />
      <ReviewText {...review} variant="detail" />
    </>
  );
}
