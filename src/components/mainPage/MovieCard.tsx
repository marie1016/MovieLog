import { Movie } from "@/types/movie";

interface CardProps {
  title: string;
  voteAverage: number;
}

function Card({ title, voteAverage }: CardProps) {
  const roundedVoteAverage = voteAverage.toFixed(1);

  return (
    <div className="h-80 w-56 rounded-xl border border-gray shadow-lg">
      <h2 className="text-base">{title}</h2>
      <span className="text-sm text-text-gray500">{roundedVoteAverage}</span>
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
            <Card title={movie.title} voteAverage={movie.vote_average} />
          </li>
        ))}
      </ul>
    </section>
  );
}
