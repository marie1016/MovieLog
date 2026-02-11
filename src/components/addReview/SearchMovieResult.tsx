import { useSearchMovies } from "@/hooks/queries/useSearchMovies";
import SkeletonMovieGrid from "../skeleton/SkeletonMovieGrid";
import MovieGrid from "./MovieGrid";

interface MovieGridProps {
  value?: string;
}

export default function SearchMovieResult({ value }: MovieGridProps) {
  const { searchResults, isError, isFetching } = useSearchMovies(value!);

  if (isFetching) return <SkeletonMovieGrid />;

  if (isError || !searchResults)
    return (
      <div className="my-6 rounded-xl bg-white p-8 text-center text-lg">
        영화 목록을 불러오는 중 오류가 발생했습니다.
      </div>
    );

  if (!searchResults.length)
    return (
      <div className="my-6 max-w-[490px] rounded-xl bg-white py-16 text-center sm:max-w-7xl">
        <p className="text-lg">검색 결과가 없습니다.</p>
        <p className="text-lg text-gray600">영화 제목을 다시 확인해주세요.</p>
      </div>
    );

  return <MovieGrid movies={searchResults} />;
}
