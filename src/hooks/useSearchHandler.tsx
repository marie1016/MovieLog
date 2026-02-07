import { closeModal } from "@/lib/store/modal";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";

export default function useSearchHandlers() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
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
    inputValue: string,
  ) => {
    if (e.key === "Enter") {
      router.push(`/${path}?query=${inputValue}`);
      setShowSearchSuggestions(false);
      setShowSearchResults(true);
    }
  };

  const handleClick = (path: string, title: string) => {
    setValue(title);
    router.push(`/${path}?query=${title}`);
    setShowSearchSuggestions(false);
    setShowSearchResults(true);
    dispatch(closeModal());
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
}
