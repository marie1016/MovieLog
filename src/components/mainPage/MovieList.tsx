import getMovies from "@/lib/api/getMovies";
import MovieCard from "./MovieCard";

export default async function MovieList({
  searchParams,
}: {
  searchParams: { sort: string };
}) {
  const sortBy = searchParams.sort || "now_playing";
  const movies = await getMovies(sortBy);

  return (
    <section className="relative h-96 w-full rounded-xl bg-white">
      <ul className="carousel flex h-full snap-x snap-mandatory space-x-5 overflow-x-auto scroll-smooth px-10">
        {movies.map((movie) => (
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
