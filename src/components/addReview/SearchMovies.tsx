"use client";

import { Movie } from "@/types/movie";
import useSearchHandlers from "@/hooks/useSearchHandler";
import useSearchSuggestions from "@/hooks/useSearchSuggestions";
import MovieGrid from "./MovieGrid";
import SearchInput from "../ui/SearchInput";

export default function SearchMovies({
  recommendedMovies,
}: {
  recommendedMovies: Movie[] | undefined;
}) {
  const {
    value,
    showSearchResults,
    handleKeyDown,
    handleInputChange,
    handleClick,
    showSearchSuggestions,
    setShowSearchSuggestions,
  } = useSearchHandlers();

  const { searchResults } = useSearchSuggestions(value, 500);

  return (
    <>
      <SearchInput
        value={value}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e, "addReview", value)}
        onClick={(title: string) => handleClick("addReview", title)}
        showSearchSuggestions={showSearchSuggestions}
        setShowSearchSuggestions={setShowSearchSuggestions}
        searchSuggestions={searchResults}
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
      {showSearchResults && <MovieGrid value={value} />}
    </>
  );
}
