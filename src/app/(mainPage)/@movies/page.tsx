import { Genres } from "@/components/mainPage/Genres";
import MovieDropdown from "@/components/mainPage/MovieDropdown";
import MovieList from "@/components/mainPage/MovieList";

export default function MoviesPage({
  searchParams,
}: {
  searchParams: { sort: string; genreId: number };
}) {
  return (
    <main>
      <h1 className="text-4xl font-medium">영화</h1>
      <Genres />
      <div className="relative">
        <MovieList searchParams={searchParams} />
        <div className="absolute -top-14 right-0">
          <MovieDropdown />
        </div>
      </div>
    </main>
  );
}
