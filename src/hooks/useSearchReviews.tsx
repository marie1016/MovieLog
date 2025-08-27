import { getReviewsForSameMovie } from "@/lib/firebase/getReviewsForSameMovie";
import { useEffect, useState } from "react";
import { Review } from "@/types/addReview";
import { useDebounce } from "./useDebounce";

export default function useSearchReviews(value: string, delay: number) {
  const [searchResults, setSearchResults] = useState<Review[]>([]);
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    const getReviews = async () => {
      const data = await getReviewsForSameMovie(debouncedValue);
      setSearchResults(data);
    };

    getReviews();
  }, [debouncedValue]);

  return { searchResults, debouncedValue };
}
