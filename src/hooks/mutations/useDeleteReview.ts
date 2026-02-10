import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "@/actions/deleteReview";
import { useDispatch } from "react-redux";
import { closeModal } from "@/lib/store/modal";

export const useDeleteReview = (id: string) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await deleteReview(id);
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

  return {
    mutation,
  };
};
