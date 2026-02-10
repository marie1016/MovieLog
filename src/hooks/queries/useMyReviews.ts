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
    staleTime: 60 * 60 * 1000,
    meta: { persist: true },
  });

  return {
    reviewsData,
    isFetching,
    isError,
  };
};
