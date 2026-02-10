import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "@/actions/updateReview";
import { UseMutationCallback } from "@/types/mutation";

export const useUpdateReview = (
  id: string,
  callbacks?: UseMutationCallback,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await updateReview(formData, id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviewsForSameMovie"] });
      queryClient.invalidateQueries({ queryKey: ["reviewById"] });

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: () => {
      alert(`리뷰 작성/수정 중 에러가 발생했습니다.`);
    },
  });

  return {
    mutation,
  };
};
