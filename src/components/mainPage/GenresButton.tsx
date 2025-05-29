"use client";

import { Genre } from "@/types/movie";
import { useRouter, useSearchParams } from "next/navigation";

export function GenresButton({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get("genreId");

  const handleClick = (genreId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("genreId", genreId.toString());
    router.push(`?${params.toString()}`);
  };

  return genres.map((genre) => (
    <button
      key={genre.id}
      className={`cursor-pointer text-xl font-semibold ${currentGenre === genre.id.toString() ? "text-blue" : "text-gray600"}`}
      onClick={() => handleClick(genre.id)}
    >
      {genre.name}
    </button>
  ));
}
