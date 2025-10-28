"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Movie } from "@/types/movie";
import useSearchHandlers from "@/hooks/useSearchHandler";
import useSearchMovies from "@/hooks/useSearchMovies";
import MovieGrid from "./MovieGrid";
import SearchInput from "../ui/SearchInput";

export default function SearchMovies({
  recommendedMovies,
}: {
  recommendedMovies: Movie[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const {
    value,
    showSearchResults,
    showSearchSuggestions,
    handleInputChange,
    handleKeyDown,
    handleClick,
  } = useSearchHandlers(query!);

  const { searchResults, debouncedValue } = useSearchMovies(value, 500);

  const handleMovieClick = (title: string) => {
    handleClick(title);
    router.push(`?query=${title}`);
  };

  return (
    <>
      <SearchInput
        value={value}
        searchResults={searchResults}
        showSearchSuggestions={showSearchSuggestions}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e, "", debouncedValue)}
        onClick={handleMovieClick}
        width="w-72 sm:w-[460px]"
        placeholder="영화검색"
        size="lg"
      />

      {/* 추천 영화 */}
      {!showSearchResults && (
        <>
          <h1 className="mb-6 mt-10 text-2xl font-medium">추천 영화</h1>
          <MovieGrid movies={recommendedMovies} />
        </>
      )}

      {/* 검색 결과 */}
      {showSearchResults && <MovieGrid movies={searchResults} />}
    </>
  );
}
