import { Review } from "@/types/addReview";
import SkeletonReviewHeader, {
  SkeletonReviewInfo,
} from "@/components/skeleton/SkeletonReviewDetail";
import ReviewHeader from "./ReviewHeader";
import ReviewInfo from "./ReviewInfo";
import ReviewText from "./ReviewText";

interface ReviewItemProps {
  review: Review | undefined;
  isFetching?: boolean;
  size?: "sm" | "lg";
}

export default function ReviewItem({
  review,
  isFetching,
  size = "sm",
}: ReviewItemProps) {
  if (isFetching) {
    return size === "lg" ? (
      <>
        <SkeletonReviewHeader size="lg" />
        <SkeletonReviewInfo size="lg" />
      </>
    ) : (
      <>
        <SkeletonReviewHeader />
        <SkeletonReviewInfo />
      </>
    );
  }

  if (!review) return null;

  return size === "lg" ? (
    <>
      <ReviewHeader {...review} size="lg" />
      <ReviewInfo {...review} size="lg" />
      <ReviewText {...review} size="lg" />
    </>
  ) : (
    <>
      <ReviewHeader {...review} />
      <ReviewInfo {...review} />
      <ReviewText {...review} />
    </>
  );
}
