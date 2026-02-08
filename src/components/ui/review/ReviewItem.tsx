import { Review } from "@/types/addReview";
import SkeletonReviewHeader, {
  SkeletonReviewInfo,
} from "@/components/skeleton/SkeletonReviewDetail";
import ReviewHeader from "./ReviewHeader";
import ReviewInfo from "./ReviewInfo";
import ReviewText from "./ReviewText";

interface ReviewItemProps {
  review: Review;
  isFetching: boolean;
}

export default function ReviewItem({ review, isFetching }: ReviewItemProps) {
  if (isFetching) {
    return (
      <>
        <SkeletonReviewHeader />
        <SkeletonReviewInfo />
      </>
    );
  }

  return (
    <>
      <ReviewHeader {...review} />
      <ReviewInfo {...review} />
      <ReviewText {...review} />
    </>
  );
}
