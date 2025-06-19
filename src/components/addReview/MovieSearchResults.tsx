import { Movie } from "@/types/movie";
import Link from "next/link";
import MovieCard from "../mainPage/MovieCard";

export default function MovieSearchResults({
  searchResults,
}: {
  searchResults: Movie[];
}) {
  return (
    <ul className="my-6 flex flex-wrap justify-center rounded-xl bg-white p-6 sm:justify-start">
      {searchResults.map((searchResult: Movie) => (
        <li
          key={searchResult.id}
          className="flex justify-center py-3 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        >
          <Link href={`addReview/movie/${searchResult.id}`}>
            <MovieCard
              title={searchResult.title}
              voteAverage={searchResult.vote_average}
              poster={searchResult.poster_path}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
