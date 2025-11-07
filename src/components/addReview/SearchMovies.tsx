"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const { value, showSearchResults, handleKeyDown, handleClick } =
    useSearchHandlers(query!);

  const { searchResults, debouncedValue, isLoading } = useSearchMovies(
    value,
    500,
  );

  const handleMovieClick = (title: string) => {
    handleClick(title);
    router.push(`?query=${title}`);
  };

  return (
    <>
      <SearchInput
        onKeyDown={(e) => handleKeyDown(e, "addReview", debouncedValue)}
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
      {showSearchResults &&
        (isLoading ? (
          <SkeletonMovieGrid />
        ) : (
          <MovieGrid movies={searchResults} />
        ))}
    </>
  );
}
