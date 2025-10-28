import { closeModal } from "@/lib/store/modal";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";

export default function useSearchHandlers(query: string) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState(query);
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
      router.push(`/${path}?query=${debouncedValue}`);
      setShowSearchResults(true);
      setShowSearchSuggestions(false);
    }
  };

  const handleClick = (title: string) => {
    setValue(title);
    setShowSearchResults(true);
    setShowSearchSuggestions(false);
    dispatch(closeModal());
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
