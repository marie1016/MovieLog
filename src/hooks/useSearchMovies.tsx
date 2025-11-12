import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import { getSearchedMovies } from "@/lib/api/getSearchedMovies";
import { useDebounce } from "./useDebounce";

export default function useSearchMovies(value: string, delay: number) {
  const [searchSuggestions, setSearchSuggestions] = useState<Movie[]>([]);
  const debouncedValue = useDebounce(value, delay);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getSearchedMovies(debouncedValue);
        setSearchSuggestions(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };
    fetchResults();
  }, [debouncedValue]);

  return {
    searchSuggestions,
    debouncedValue,
    error,
    setError,
  };
}
