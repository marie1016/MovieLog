import { Movie } from "@/types/movie";
import { getSearchResults } from "@/lib/api/getSearchResults";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

export const useSearchSuggestions = (value: string, delay: number) => {
  const debouncedValue = useDebounce(value, delay);

  const {
    data: searchResults,
    isError,
    error,
    isLoading,
  } = useQuery<Movie[] | undefined>({
    queryKey: ["searchSuggestions", debouncedValue],
    queryFn: () => getSearchResults(debouncedValue),
    enabled: !!debouncedValue,
  });

  return {
    searchResults,
    error,
    isError,
    isLoading,
  };
};
