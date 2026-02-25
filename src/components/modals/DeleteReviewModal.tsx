import { useDeleteReview } from "@/hooks/mutations/useDeleteReview";
import { useDispatch } from "react-redux";
import { closeModal } from "@/lib/store/modal";
import Button from "../ui/button";

export default function DeleteReviewModal({ id }: { id?: string }) {
  const dispatch = useDispatch();
  const { mutation } = useDeleteReview(id!);

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60">
      <div className="z-20 h-40 w-72 rounded-xl bg-white p-7">
        <h2 className="text-center text-xl font-medium">
          이 리뷰를 삭제하겠습니까?
        </h2>
        <div className="mt-10 flex justify-between">
          <Button
            className="h-10 w-28 bg-black"
            onClick={() => dispatch(closeModal())}
          >
            아니오
          </Button>
          <Button
            className="h-10 w-28 bg-danger"
            disabled={mutation.isPending}
            onClick={onSubmit}
          >
            네
          </Button>
        </div>
      </div>
    </div>
  );
}
