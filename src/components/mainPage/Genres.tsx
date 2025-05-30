import getGenres from "@/lib/api/getGenres";
import { GenresButton } from "./GenresButton";

export async function Genres() {
  const genres = await getGenres();

  return (
    <div className="my-4 flex items-center gap-4">
      <GenresButton genres={genres} />
    </div>
  );
}
