import { deleteReview } from "@/actions/deleteReview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeModal } from "@/lib/store/modal";
import { useDispatch } from "react-redux";
import Button from "../ui/button";

export default function DeleteReviewModal({ id }: { id: string | undefined }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await deleteReview(id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviewsForSameMovie"] });
      queryClient.invalidateQueries({
        queryKey: ["reviewById"],
      });

      dispatch(closeModal());
    },
    onError: (error) => {
      console.log(error);
      alert(`리뷰 삭제 중 에러가 발생했습니다.`);
      dispatch(closeModal());
    },
  });

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <dialog
      className="fixed inset-0 z-20 mx-auto h-40 w-72 rounded-xl bg-white p-7"
      open
    >
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
    </dialog>
  );
}
