import { getReviewsForSameMovie } from "@/lib/firebase/getReviewsForSameMovie";
import { Review } from "@/types/addReview";
import { useQuery } from "@tanstack/react-query";

export const useSearchReviews = (
  reviews: Review[] | undefined,
  value: string,
) =>
  useQuery<Review[] | undefined>({
    queryKey: ["reviewsForSameMovie", value],
    queryFn: () => getReviewsForSameMovie(value),
    initialData: reviews,
    enabled: !!value && value.trim() !== "",
  });
