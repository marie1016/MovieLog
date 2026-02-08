import { getSearchResults } from "@/lib/api/getSearchResults";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/types/movie";

export const useSearchMovies = (value: string) => {
  const {
    data: searchResults,
    isError,
    error,
    isFetching,
  } = useQuery<Movie[] | undefined>({
    queryKey: ["searchMovies", value],
    queryFn: () => getSearchResults(value),
    enabled: !!value && value.trim() !== "",
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    searchResults,
    error,
    isError,
    isFetching,
  };
};
