"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSearchHandlers from "@/hooks/useSearchHandler";
import useSearchMovies from "@/hooks/useSearchMovies";
import SearchInput from "./addReview/SearchInput";

export default function SearchReviews() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const decodedQuery = query ? decodeURIComponent(query) : "";

  const {
    value,
    setValue,
    showSearchResults,
    setShowSearchResults,
    handleInputChange,
    handleKeyDown,
  } = useSearchHandlers(decodedQuery);

  const { searchResults, debouncedValue } = useSearchMovies(value, 500);

  const handleClick = (title: string) => {
    setValue(title);
    router.push(`searchReviews?query=${title}`);
    setShowSearchResults(true);
  };

  return (
    <SearchInput
      value={value}
      searchResults={searchResults}
      showSearchResults={showSearchResults}
      onChange={handleInputChange}
      onKeyDown={(e) => handleKeyDown(e, "searchReviews", debouncedValue)}
      onClick={handleClick}
      className="w-72 pl-16 focus:z-0"
      placeholder="리뷰검색"
    />
  );
}
