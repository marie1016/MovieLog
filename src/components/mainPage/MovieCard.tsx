import { Movie } from "@/types/movie";
import Image from "next/image";

interface CardProps {
  title: string;
  voteAverage: number;
  poster: string;
}

const BASE_POSTER_PATH = "https://image.tmdb.org/t/p";

function Card({ title, voteAverage, poster }: CardProps) {
  const roundedVoteAverage = voteAverage.toFixed(1);
  const posterPath = `${BASE_POSTER_PATH}/w500${poster}`;
  return (
    <div className="flex h-80 w-56 items-center justify-center rounded-xl border border-gray shadow-lg">
      <div className="flex h-[284px] w-36 flex-col justify-between">
        <Image src={posterPath} alt="영화 포스터" width={144} height={216} />
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

export default async function MovieCard() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, {
    cache: "no-store",
  });
  const movies = (await res.json()) as Movie[];

  console.log(movies);
  return (
    <section className="relative h-96 w-full rounded-xl bg-white">
      <ul className="carousel scrollbar-hide flex h-full snap-x snap-mandatory space-x-5 overflow-x-auto scroll-smooth px-10">
        {movies.map((movie) => (
          <li key={movie.id} className="flex snap-center items-center">
            <Card
              title={movie.title}
              voteAverage={movie.vote_average}
              poster={movie.poster_path}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
