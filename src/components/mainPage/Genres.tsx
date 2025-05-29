import getGenres from "@/lib/api/getGenres";

export async function Genres() {
  const genres = await getGenres();

  return (
    <div className="my-4 flex items-center gap-4">
      {genres.map((genre) => (
        <div key={genre.id} className="text-xl font-semibold text-gray600">
          {genre.name}
        </div>
      ))}
    </div>
  );
}
