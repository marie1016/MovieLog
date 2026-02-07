import { Movie } from "@/types/movie";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import Link from "next/link";
import MovieCard from "../ui/movie/MovieCard";
import SkeletonMovieGrid from "../skeleton/SkeletonMovieGrid";

interface MovieGridProps {
  recommendedMovies?: Movie[] | undefined;
  value?: string;
}

export default function MovieGrid({
  recommendedMovies,
  value,
}: MovieGridProps) {
  const { searchResults, isError, isLoading } = useSearchMovies(value);
  const movies = recommendedMovies || searchResults;

  if (isLoading) return <SkeletonMovieGrid />;

  if (isError)
    return (
      <div className="my-6 rounded-xl bg-white py-8 text-center text-lg">
        영화 목록을 불러오는 중 오류가 발생했습니다.
      </div>
    );

  if (recommendedMovies?.length === 0)
    return (
      <div className="my-6 max-w-[490px] rounded-xl bg-white py-16 text-center sm:max-w-7xl">
        <div className="mb-6">
          <p className="text-lg">아직 작성하신 리뷰가 없습니다.</p>
          <p className="text-lg text-gray600">
            리뷰를 작성하면 취향에 맞는 영화를 추천해드립니다.
          </p>
        </div>
        <div>
          <p>[리뷰 작성 방법]</p>
          <p>영화 검색 → 영화 포스터 클릭</p>
        </div>
      </div>
    );

  if (searchResults?.length === 0)
    return (
      <div className="my-6 max-w-[490px] rounded-xl bg-white py-16 text-center sm:max-w-7xl">
        <p className="text-lg">검색 결과가 없습니다.</p>
        <p className="text-lg text-gray600">영화 제목을 다시 확인해주세요.</p>
      </div>
    );

  return (
    <ul className="my-6 flex max-w-[490px] flex-wrap justify-center rounded-xl bg-white p-6 sm:max-w-7xl sm:justify-start">
      {movies?.map((movie: Movie) => (
        <li
          key={movie.id}
          className="flex justify-center py-3 sm:basis-1/2 lg:basis-1/3"
        >
          <Link href={`/addReview/movie/${movie.id}`}>
            <MovieCard
              title={movie.title}
              voteAverage={movie.vote_average}
              poster={movie.poster_path}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
