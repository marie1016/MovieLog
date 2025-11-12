"use client";

import { useSearchParams } from "next/navigation";
import useSearchHandlers from "@/hooks/useSearchHandler";
import useSearchMovies from "@/hooks/useSearchMovies";
import SearchInput from "../ui/SearchInput";

export default function SearchReviews({
  width,
  border,
}: {
  width: string;
  border?: boolean;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const {
    value,
    handleInputChange,
    handleKeyDown,
    handleClick,
    showSearchSuggestions,
    setShowSearchSuggestions,
  } = useSearchHandlers(query!);

  const { debouncedValue, searchSuggestions } = useSearchMovies(value, 200);

  return (
    <SearchInput
      value={value}
      onKeyDown={(e) => handleKeyDown(e, "searchReviews", debouncedValue)}
      onChange={handleInputChange}
      onClick={(title: string) => handleClick("searchReviews", title)}
      showSearchSuggestions={showSearchSuggestions}
      setShowSearchSuggestions={setShowSearchSuggestions}
      searchSuggestions={searchSuggestions}
      width={width}
      placeholder="리뷰검색"
      border={border}
    />
  );
}
