import { getSearchResults } from "@/lib/api/getSearchResults";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/types/movie";

export default function useSearchMovies(value: string | undefined) {
  const {
    data: searchResults,
    isError,
    error,
    isLoading,
  } = useQuery<Movie[] | undefined>({
    queryKey: ["searchMovies", value],
    queryFn: () => getSearchResults(value!),
    enabled: !!value,
  });

  return {
    searchResults,
    error,
    isError,
    isLoading,
  };
}
