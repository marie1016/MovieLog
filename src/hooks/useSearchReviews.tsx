import { getReviewsForSameMovie } from "@/lib/firebase/getReviewsForSameMovie";
import { Review } from "@/types/addReview";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

export default function useSearchReviews(value: string, delay: number) {
  const debouncedValue = useDebounce(value, delay);

  const {
    data: searchResults,
    isError,
    error,
  } = useSuspenseQuery<Review[] | undefined>({
    queryKey: ["reviewsForSameMovie", debouncedValue],
    queryFn: () => getReviewsForSameMovie(debouncedValue),
  });

  return { searchResults, isError, error };
}
