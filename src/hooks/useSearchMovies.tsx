import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export default function useSearchMovies(value: string, delay: number) {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedValue) {
        const res = await fetch(`/api/searchedMovies?query=${debouncedValue}`);
        const data = (await res.json()) as Movie[];
        setSearchResults(data);
      }
    };

    fetchResults();
  }, [debouncedValue]);

  return { searchResults, debouncedValue };
}
