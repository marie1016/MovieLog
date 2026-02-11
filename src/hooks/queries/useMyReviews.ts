import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "@/lib/firebase/getMyReviews";

export const useMyReviews = (displayName: string) => {
  const {
    data: reviewsData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["myReviews"],
    queryFn: () => getMyReviews(displayName),
    enabled: !!displayName,
    staleTime: 1000 * 60 * 5,
  });

  return {
    reviewsData,
    isFetching,
    isError,
  };
};
