import getMovies from "@/lib/api/getMovies";
import MovieCard from "../mainPage/MovieCard";

export default async function SimilarMovies({
  genreId,
}: {
  genreId: string | undefined;
}) {
  const data = await getMovies("top_rated");

  let similarMovies;
  if (genreId) {
    similarMovies = data.filter((movie) =>
      movie.genre_ids.includes(Number(genreId)),
    );
  }

  const similarMovieList = similarMovies
    ?.slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 7);

  return (
    <section className="relative h-96 w-full rounded-xl bg-white">
      <ul className="carousel flex h-full snap-x snap-mandatory space-x-5 overflow-x-auto scroll-smooth px-10">
        {similarMovieList?.map((movie) => (
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
