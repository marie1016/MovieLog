import { Genres } from "@/components/mainPage/Genres";
import MovieDropdown from "@/components/mainPage/MovieDropdown";
import MovieList from "@/components/mainPage/MovieList";

export default function MoviesPage({
  searchParams,
}: {
  searchParams: { sort: string; genreId: string };
}) {
  return (
    <main>
      <h1 className="text-4xl font-medium">영화</h1>
      <section className="flex items-center gap-5 md:justify-between">
        <Genres />
        <MovieDropdown />
      </section>
      <section>
        <MovieList searchParams={searchParams} />
      </section>
    </main>
  );
}
