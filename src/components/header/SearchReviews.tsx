"use client";

import { useRef } from "react";
import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { useReviewSearchHandler } from "@/hooks/useReviewSearchHandler";
import SearchInput from "../ui/SearchInput";
import SearchSuggestions from "../ui/SearchSuggestions";

export default function SearchReviews({
  width,
  border,
}: {
  width: string;
  border: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const {
    value,
    handleInputChange,
    handleKeyDown,
    handleClick,
    showSearchSuggestions,
    setShowSearchSuggestions,
  } = useReviewSearchHandler();

  const { searchResults } = useSearchSuggestions(value, 500);

  useHandleClickOutside(ref, () => setShowSearchSuggestions(false));

  return (
    <div className="relative">
      <SearchInput
        value={value}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={handleInputChange}
        width={width}
        placeholder="리뷰검색"
      />

      {/* 추천 검색어 */}
      {searchResults?.length && showSearchSuggestions && (
        <div ref={ref} className="absolute top-16 z-10">
          <SearchSuggestions
            border={border}
            searchSuggestions={searchResults}
            onClick={(title: string) => handleClick(title)}
            size="sm"
          />
        </div>
      )}
    </div>
  );
}
