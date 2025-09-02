import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { closeModal } from "@/lib/store/modal";
import { ReviewPage } from "@/lib/firebase/getReviews";
import { Review } from "@/types/addReview";
import ReviewForm from "../addReview/ReviewForm";

interface UpdateReviewModalProps {
  id: string | undefined;
}

export default function EditReviewModal({ id }: UpdateReviewModalProps) {
  const dispatch = useDispatch();
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

  return (
    <dialog
      className="fixed inset-0 z-20 mt-20 h-full w-screen overflow-y-auto rounded-xl bg-white p-7 sm:mb-20 sm:max-h-[calc(100vh-10rem)] sm:w-[480px] sm:px-14 sm:py-10"
      open
    >
      <h2 className="text-center text-2xl font-medium">영화 리뷰 수정</h2>
      <div className="mt-10">
        <ReviewForm {...review} closeEditModal={() => dispatch(closeModal())} />
      </div>
    </dialog>
  );
}
