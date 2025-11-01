import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

export default function MovieCarousel({
  movieList,
}: {
  movieList: Movie[] | undefined;
}) {
  if (!movieList?.length)
    return (
      <div className="rounded-xl bg-white py-8 text-center text-lg">
        영화 목록을 불러오는 중 오류가 발생했습니다.
      </div>
    );

  return (
    <section className="relative h-96 w-full rounded-xl bg-white">
      <ul className="carousel flex h-full snap-x snap-mandatory space-x-5 overflow-x-auto scroll-smooth px-10">
        {movieList.map((movie) => (
          <li key={movie.id} className="flex snap-center items-center">
            <MovieCard
              title={movie.title}
              voteAverage={movie.vote_average}
              poster={movie.poster_path}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
