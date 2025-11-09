import { closeModal } from "@/lib/store/modal";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchedMovies } from "@/lib/api/getSearchedMovies";
import useSearchMovies from "./useSearchMovies";

export default function useSearchHandlers(query: string) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState(query);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setError } = useSearchMovies(value, 200);

  const fetchResults = async (title: string) => {
    try {
      setIsLoading(true);
      const data = await getSearchedMovies(title);
      setSearchResults(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowSearchResults(false);
    setShowSearchSuggestions(true);
    setValue(e.target.value);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    path: string,
    inputValue: string,
  ) => {
    if (e.key === "Enter") {
      router.push(`/${path}?query=${inputValue}`);
      setShowSearchSuggestions(false);
      setShowSearchResults(true);
    }
  };

  const handleClick = (path: string, title: string) => {
    fetchResults(title);
    router.push(`/${path}?query=${title}`);
    setValue(title);
    setShowSearchSuggestions(false);
    setShowSearchResults(true);
    dispatch(closeModal());
  };

  return {
    value,
    searchResults,
    showSearchResults,
    showSearchSuggestions,
    setShowSearchSuggestions,
    handleInputChange,
    handleKeyDown,
    handleClick,
    isLoading,
  };
}
