"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const decodedQuery = query ? decodeURIComponent(query) : "";

  const {
    value,
    showSearchSuggestions,
    handleInputChange,
    handleKeyDown,
    handleClick,
  } = useSearchHandlers(decodedQuery);

  const { searchResults, debouncedValue } = useSearchMovies(value, 500);

  const handleReviewClick = (title: string) => {
    handleClick(title);
    router.push(`searchReviews?query=${title}`);
  };

  return (
    <SearchInput
      value={value}
      searchResults={searchResults}
      showSearchSuggestions={showSearchSuggestions}
      onChange={handleInputChange}
      onKeyDown={(e) => handleKeyDown(e, "searchReviews", debouncedValue)}
      onClick={handleReviewClick}
      width={width}
      placeholder="리뷰검색"
      border={border}
    />
  );
}
