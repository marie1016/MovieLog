import Image from "next/image";

interface CardProps {
  title: string;
  voteAverage: number;
  poster: string;
}

const BASE_POSTER_PATH = "https://image.tmdb.org/t/p";

export default function MovieCard({ title, voteAverage, poster }: CardProps) {
  const roundedVoteAverage = voteAverage.toFixed(1);
  const posterPath = `${BASE_POSTER_PATH}/w500${poster}`;

  return (
    <div className="flex h-80 w-56 items-center justify-center rounded-xl border border-gray shadow-lg">
      <div className="flex h-[284px] w-36 flex-col justify-between">
        <div className="relative aspect-[2/3] w-36">
          <Image
            src={posterPath}
            alt="영화 포스터"
            sizes="144px"
            fill
            priority
          />
        </div>
        <h2 className="line-clamp-2 overflow-ellipsis break-words text-center text-base">
          {title}
        </h2>
        <div className="flex items-center justify-center gap-1">
          <img src="/images/star.svg" alt="star" />
          <span className="text-sm text-text-gray500">
            {roundedVoteAverage}
          </span>
        </div>
      </div>
    </div>
  );
}
