"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Movie } from "@/types/movie";
import useSearchHandlers from "@/hooks/useSearchHandler";
import useSearchMovies from "@/hooks/useSearchMovies";
import MovieGrid from "./MovieGrid";
import SearchInput from "./SearchInput";

export default function SearchMovies({
  recommendedMovies,
}: {
  recommendedMovies: Movie[];
}) {
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
    router.push(`?query=${title}`);
    setShowSearchResults(true);
  };

  return (
    <>
      <SearchInput
        value={value}
        searchResults={searchResults}
        showSearchResults={showSearchResults}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e, "", debouncedValue)}
        onClick={handleClick}
        className="w-72 pl-16 focus:z-0 sm:w-[460px]"
        placeholder="영화검색"
        size="lg"
      />

      {/* 추천 영화 */}
      {!showSearchResults && (
        <>
          <h1 className="mb-6 mt-10 text-4xl font-medium">추천 영화</h1>
          <MovieGrid movies={recommendedMovies} />
        </>
      )}

      {/* 검색 결과 */}
      {showSearchResults && <MovieGrid movies={searchResults} />}
    </>
  );
}
