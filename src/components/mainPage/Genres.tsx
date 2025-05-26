import { Genre } from "@/types/movie";
import Link from "next/link";

export async function Genres() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`);
  const genres = (await res.json()) as Genre[];

  return (
    <div className="my-4 flex items-center gap-4">
      {genres.map((genre) => (
        <div key={genre.id} className="text-text-gray600 text-xl font-semibold">
          <Link href={`/${genre.name}`}>{genre.name}</Link>
        </div>
      ))}
    </div>
  );
}
