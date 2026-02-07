import { closeModal } from "@/lib/store/modal";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useReviewSearchHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (query) setValue(query);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowSearchResults(false);
    setShowSearchSuggestions(true);
    setValue(e.target.value);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    inputValue: string,
  ) => {
    if (e.key === "Enter" && inputValue?.trim() !== "") {
      router.push(`/searchReviews?query=${inputValue}`);
      setShowSearchSuggestions(false);
      setShowSearchResults(true);
    }
  };

  const handleClick = (title: string) => {
    setValue(title);
    router.push(`/searchReviews?query=${title}`);
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
};
