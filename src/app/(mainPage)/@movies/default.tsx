import { Genres } from "@/components/mainPage/Genres";
import MovieCard from "@/components/mainPage/MovieCard";

export default function MoviesPage() {
  return (
    <main>
      <h1 className="text-4xl font-medium">영화</h1>
      <Genres />
      <MovieCard />
    </main>
  );
}
