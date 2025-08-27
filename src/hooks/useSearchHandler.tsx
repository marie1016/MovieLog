import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function useSearchHandlers(decodedQuery: string) {
  const router = useRouter();
  const [value, setValue] = useState(decodedQuery);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowSearchResults(false);
    setShowSearchSuggestions(true);
    setValue(e.target.value);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    path: string,
    debouncedValue: string,
  ) => {
    if (e.key === "Enter") {
      router.push(`${path}?query=${debouncedValue}`);
      setShowSearchResults(true);
      setShowSearchSuggestions(false);
    }
  };

  const handleClick = (title: string) => {
    setValue(title);
    setShowSearchResults(true);
    setShowSearchSuggestions(false);
  };

  return {
    value,
    showSearchResults,
    showSearchSuggestions,
    handleInputChange,
    handleKeyDown,
    handleClick,
  };
}
