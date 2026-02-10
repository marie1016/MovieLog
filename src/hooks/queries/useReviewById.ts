import { useQuery } from "@tanstack/react-query";
import { getReviewById } from "@/lib/firebase/getReviewById";
import { Review } from "@/types/addReview";

export const useReviewById = (id: string, reviewById?: Review | undefined) => {
  const {
    data: review,
    error,
    isFetching,
  } = useQuery<Review | undefined>({
    queryKey: ["reviewById"],
    queryFn: async () => getReviewById(id),
    initialData: reviewById,
    staleTime: 1000 * 60 * 5,
  });

  return {
    review,
    isFetching,
    error,
  };
};
