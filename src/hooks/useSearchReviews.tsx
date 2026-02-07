import { getReviewsForSameMovie } from "@/lib/firebase/getReviewsForSameMovie";
import { Review } from "@/types/addReview";
import { useQuery } from "@tanstack/react-query";

export default function useSearchReviews(value: string) {
  const {
    data: searchResults,
    isError,
    error,
    isFetching,
  } = useQuery<Review[] | undefined>({
    queryKey: ["reviewsForSameMovie", value],
    queryFn: () => getReviewsForSameMovie(value),
  });

  return { searchResults, isError, error, isFetching };
}
