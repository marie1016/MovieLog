import { useReviewById } from "@/hooks/queries/useReviewById";
import ReviewForm from "../addReview/ReviewForm";

interface EditReviewModalProps {
  id: string | undefined;
}

export default function EditReviewModal({ id }: EditReviewModalProps) {
  const { review } = useReviewById(id!);

  if (!review) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center bg-black/60 sm:items-center">
      <div className="z-20 max-h-[90vh] w-full animate-bottom-up overflow-y-auto rounded-t-2xl bg-white p-7 sm:max-w-lg sm:animate-none sm:rounded-xl sm:p-10">
        <h2 className="text-center text-xl font-medium">영화 리뷰 수정</h2>
        <div className="mt-10">
          <ReviewForm {...review} />
        </div>
      </div>
    </div>
  );
}
