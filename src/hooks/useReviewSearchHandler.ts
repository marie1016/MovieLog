import { closeModal } from "@/lib/store/modal";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useReviewSearchHandler = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const titleParams = params?.title as string;
  const [value, setValue] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (titleParams) setValue(decodeURIComponent(titleParams));
  }, [titleParams]);

  const submitSearch = (searchValue: string) => {
    router.push(`/searchReviews/${encodeURIComponent(searchValue)}`);
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
