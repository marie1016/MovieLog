import { useDispatch } from "react-redux";
import { closeModal } from "@/lib/store/modal";
import { useReviewById } from "@/hooks/queries/useReviewById";
import ReviewForm from "../addReview/ReviewForm";

interface EditReviewModalProps {
  id: string | undefined;
}

export default function EditReviewModal({ id }: EditReviewModalProps) {
  const dispatch = useDispatch();

  const { review } = useReviewById(id!);

  if (!review) return null;

  return (
    <dialog
      className="fixed inset-0 z-20 mt-20 h-full w-screen overflow-y-auto rounded-xl bg-white p-7 sm:mb-20 sm:max-h-[calc(100vh-10rem)] sm:w-[480px] sm:px-14 sm:py-10"
      open
    >
      <h2 className="text-center text-xl font-medium">영화 리뷰 수정</h2>
      <div className="mt-10">
        <ReviewForm {...review} closeEditModal={() => dispatch(closeModal())} />
      </div>
    </dialog>
  );
}
