import getMovies from "@/lib/api/getMovies";
import MovieCarousel from "../ui/movie/MovieCarousel";

export default async function SimilarMovies({
  genreId,
}: {
  genreId: string | undefined;
}) {
  const data = await getMovies("top_rated");

  let similarMovies = data;

  if (genreId) {
    similarMovies = data?.filter((movie) =>
      movie?.genre_ids.includes(Number(genreId)),
    );
  }

  const similarMovieList = similarMovies
    ?.slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 7);

  return <MovieCarousel movieList={similarMovieList} />;
}
