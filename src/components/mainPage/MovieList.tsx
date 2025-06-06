import getMovies from "@/lib/api/getMovies";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

export default async function MovieList({
  searchParams,
}: {
  searchParams: { sort: string; genreId: string };
}) {
  const sortBy = searchParams.sort || "now_playing";
  const { genreId } = searchParams;

  const data = await getMovies(sortBy);

  let movies = data;

  if (genreId) {
    movies = movies.filter((movie: Movie) =>
      movie.genre_ids.includes(Number(genreId)),
    );
  }

  const movieList = movies.slice(0, 10);

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
