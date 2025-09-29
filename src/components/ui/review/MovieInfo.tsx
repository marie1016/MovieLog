import { Genre } from "@/types/movie";

interface MovieInfoProps {
  title: string;
  genres: Genre[];
  runtime: number;
}

export default function MovieInfo({ title, genres, runtime }: MovieInfoProps) {
  return (
    <>
      <span className="line-clamp-2 overflow-ellipsis break-keep">{title}</span>
      <div className="flex gap-2 truncate text-gray600">
        {genres.slice(0, 2).map((genre) => (
          <div key={genre.id}>{genre.name}</div>
        ))}
      </div>
      <div className="text-left text-gray600">{runtime}분</div>
    </>
  );
}
