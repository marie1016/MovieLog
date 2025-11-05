import getGenres from "@/lib/api/getGenres";
import { GenresButton } from "./GenresButton";

export async function Genres() {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  const genres = await getGenres();

  return (
    <div className="my-4 flex h-10 items-center gap-4 overflow-x-auto whitespace-nowrap">
      <GenresButton genres={genres} />
    </div>
  );
}
