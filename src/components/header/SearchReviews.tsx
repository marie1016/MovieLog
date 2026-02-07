"use client";

import useSearchSuggestions from "@/hooks/useSearchSuggestions";
import useSearchHandlers from "@/hooks/useSearchHandler";
import SearchInput from "../ui/SearchInput";

export default function SearchReviews({
  width,
  border,
}: {
  width: string;
  border?: boolean;
}) {
  const {
    value,
    handleInputChange,
    handleKeyDown,
    handleClick,
    showSearchSuggestions,
    setShowSearchSuggestions,
  } = useSearchHandlers();

  const { searchResults } = useSearchSuggestions(value, 500);

  return (
    <SearchInput
      value={value}
      onKeyDown={(e) => handleKeyDown(e, "searchReviews", value)}
      onChange={handleInputChange}
      onClick={(title: string) => handleClick("searchReviews", title)}
      showSearchSuggestions={showSearchSuggestions}
      setShowSearchSuggestions={setShowSearchSuggestions}
      searchSuggestions={searchResults}
      width={width}
      placeholder="리뷰검색"
      border={border}
    />
  );
}
