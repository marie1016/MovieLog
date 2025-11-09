"use client";

import { useSearchParams } from "next/navigation";
import { Movie } from "@/types/movie";
import useSearchHandlers from "@/hooks/useSearchHandler";
import useSearchMovies from "@/hooks/useSearchMovies";
import MovieGrid from "./MovieGrid";
import SearchInput from "../ui/SearchInput";
import SkeletonMovieGrid from "../skeleton/SkeletonMovieGrid";

export default function SearchMovies({
  recommendedMovies,
}: {
  recommendedMovies: Movie[] | undefined;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const {
    value,
    searchResults,
    showSearchResults,
    handleKeyDown,
    handleInputChange,
    handleClick,
    isLoading,
    showSearchSuggestions,
    setShowSearchSuggestions,
  } = useSearchHandlers(query!);

  const { searchSuggestions, error } = useSearchMovies(value, 200);

  return (
    <>
      <SearchInput
        value={value}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e, "addReview", value)}
        onClick={(title: string) => handleClick("addReview", title)}
        showSearchSuggestions={showSearchSuggestions}
        setShowSearchSuggestions={setShowSearchSuggestions}
        searchResults={searchSuggestions}
        width="w-72 sm:w-[460px]"
        placeholder="영화검색"
        size="lg"
      />

      {/* 추천 영화 */}
      {!showSearchResults && (
        <>
          <h1 className="mb-6 mt-10 text-2xl font-medium">추천 영화</h1>
          <MovieGrid recommendedMovies={recommendedMovies} />
        </>
      )}

      {/* 검색 결과 */}
      {showSearchResults &&
        (isLoading ? (
          <SkeletonMovieGrid />
        ) : (
          <MovieGrid searchResults={searchResults} error={error} />
        ))}
    </>
  );
}
