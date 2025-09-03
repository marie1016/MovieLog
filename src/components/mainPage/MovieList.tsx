import getMovies from "@/lib/api/getMovies";
import { Movie } from "@/types/movie";
import MovieCarousel from "../ui/movie/MovieCarousel";

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

  return <MovieCarousel movieList={movieList} />;
}
