"use client";

import { useRef } from "react";

import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";
import { useSearchSuggestions } from "@/hooks/queries/useSearchSuggestions";
import { useMovieSearchHandler } from "@/hooks/useMovieSearchHandler";
import SearchInput from "../ui/SearchInput";
import SearchSuggestions from "../ui/SearchSuggestions";
import RecommendedMovieResult from "./RecommendedMovieResult";
import SearchMovieResult from "./SearchMovieResult";

export default function SearchMovies() {
  const ref = useRef<HTMLDivElement>(null);

  const {
    value,
    showSearchResults,
    handleInputChange,
    handleKeyDown,
    handleClick,
    showSearchSuggestions,
    setShowSearchSuggestions,
  } = useMovieSearchHandler();

  const { data: searchResults } = useSearchSuggestions(value, 500);

  useHandleClickOutside(ref, () => setShowSearchSuggestions(false));

  return (
    <div className="relative">
      <SearchInput
        value={value}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e)}
        width="w-72 sm:w-[460px]"
        placeholder="영화검색"
      />

      {/* 추천 영화 */}
      {!showSearchResults && (
        <>
          <h1 className="mb-6 mt-10 text-2xl font-medium">추천 영화</h1>
          <RecommendedMovieResult />
        </>
      )}

      {/* 추천 검색어 */}
      {searchResults?.length && showSearchSuggestions && (
        <div ref={ref} className="absolute top-16 z-10">
          <SearchSuggestions
            border
            searchSuggestions={searchResults}
            onClick={(title: string) => handleClick(title)}
            size="lg"
          />
        </div>
      )}

      {/* 검색 결과 */}
      {showSearchResults && <SearchMovieResult value={value} />}
    </div>
  );
}
