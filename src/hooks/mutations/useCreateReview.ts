import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/actions/createReview";
import { Genre } from "@/types/movie";

export const useCreateReview = (
  movieId: number,
  posterPath: string,
  title: string,
  genres: Genre[],
  runtime: number,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      createReview(formData, movieId, posterPath, title, genres, runtime),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviewsForSameMovie"] });
      queryClient.invalidateQueries({ queryKey: ["reviewById"] });
    },
    onError: () => {
      alert(`리뷰 작성/수정 중 에러가 발생했습니다.`);
    },
  });

  return {
    mutation,
  };
};
