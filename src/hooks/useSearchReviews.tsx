import { getReviewsForSameMovie } from "@/lib/firebase/getReviewsForSameMovie";
import { useEffect, useState } from "react";
import { Review } from "@/types/addReview";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

export default function useSearchReviews(value: string, delay: number) {
  const [searchResults, setSearchResults] = useState<Review[] | undefined>([]);
  const debouncedValue = useDebounce(value, delay);

  const { data } = useQuery<Review[] | undefined>({
    queryKey: ["reviewsForSameMovie"],
    queryFn: () => getReviewsForSameMovie(debouncedValue),
  });

  useEffect(() => {
    setSearchResults(data);
  }, [data]);

  return { searchResults, debouncedValue };
}
