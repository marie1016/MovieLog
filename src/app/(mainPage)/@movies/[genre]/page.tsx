import { Genres } from "@/components/mainPage/Genres";
import MovieCard from "@/components/mainPage/MovieCard";

export default function MoviesPage({ params }: { params: { genre: string } }) {
  const genreName = decodeURIComponent(params.genre);
  return (
    <>
      <h1 className="text-4xl font-medium">영화 {genreName} </h1>
      <Genres />
      <MovieCard />
    </>
  );
}
