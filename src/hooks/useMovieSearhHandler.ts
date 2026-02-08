import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

export const useMovieSearchHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [value, setValue] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (query) setValue(query);
  }, [query]);

  const submitSearch = (searchValue: string) => {
    router.push(`/addReview?query=${encodeURIComponent(searchValue)}`);
    setShowSearchSuggestions(false);
    setShowSearchResults(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowSearchResults(false);
    setShowSearchSuggestions(true);
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value?.trim() !== "") {
      submitSearch(value);
    }
  };

  const handleClick = (title: string) => {
    setValue(title);
    submitSearch(title);
  };

  return {
    value,
    showSearchResults,
    showSearchSuggestions,
    setShowSearchSuggestions,
    handleInputChange,
    handleKeyDown,
    handleClick,
  };
};
