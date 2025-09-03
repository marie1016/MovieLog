import { Movie } from "@/types/movie";
import Link from "next/link";
import MovieCard from "../ui/movie/MovieCard";

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <ul className="my-6 flex max-w-[490px] flex-wrap justify-center rounded-xl bg-white p-6 sm:max-w-7xl sm:justify-start">
      {movies.map((movie: Movie) => (
        <li
          key={movie.id}
          className="flex justify-center py-3 sm:basis-1/2 lg:basis-1/3"
        >
          <Link href={`addReview/movie/${movie.id}`}>
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
