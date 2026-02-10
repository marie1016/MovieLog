"use client";

import { useRef } from "react";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";
import { useSearchSuggestions } from "@/hooks/queries/useSearchSuggestions";
import { useMovieSearchHandler } from "@/hooks/useMovieSearchHandler";
import { useMyReviews } from "@/hooks/queries/useMyReviews";
import { useRecommendedMovies } from "@/hooks/queries/useRecommendedMovies";
import MovieGrid from "./MovieGrid";
import SearchInput from "../ui/SearchInput";
import SearchSuggestions from "../ui/SearchSuggestions";
import SkeletonMovieGrid from "../skeleton/SkeletonMovieGrid";

export default function SearchMovies() {
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const displayName = user?.displayName || "";

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

  const { reviewsData } = useMyReviews(displayName);
  const { data: recommendedMovies, isFetching } =
    useRecommendedMovies(reviewsData);

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
          {isFetching ? (
            <SkeletonMovieGrid />
          ) : (
            <MovieGrid recommendedMovies={recommendedMovies} />
          )}
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
      {showSearchResults && <MovieGrid value={value} />}
    </div>
  );
}
