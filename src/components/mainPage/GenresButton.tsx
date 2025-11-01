"use client";

import { Genre } from "@/types/movie";
import { useRouter, useSearchParams } from "next/navigation";

export function GenresButton({ genres }: { genres: Genre[] | undefined }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get("genreId");

  const handleClick = (genreId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("genreId", genreId.toString());
    router.push(`?${params.toString()}`);
  };

  if (!genres)
    return (
      <div className="text-center text-lg">
        장르를 불러오는 중 오류가 발생했습니다.
      </div>
    );

  return genres.map((genre) => (
    <button
      key={genre.id}
      className={`cursor-pointer text-xl font-semibold hover:text-blue ${currentGenre === genre.id.toString() ? "text-blue" : "text-gray600"}`}
      onClick={() => handleClick(genre.id)}
    >
      {genre.name}
    </button>
  ));
}
