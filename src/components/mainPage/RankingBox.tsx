import { getRecentTopReviewedMovies } from "@/lib/firebase/getRecentTopReviewedMovies";

export default async function RankingBox() {
  const sortedTitleMap = await getRecentTopReviewedMovies();

  return (
    <div className="relative h-11 max-w-80 overflow-hidden rounded-xl border border-gray bg-white px-5 lg:h-auto lg:px-8 lg:py-6">
      <ul className="flex animate-slide-up flex-col items-start font-medium text-gray lg:animate-none">
        {sortedTitleMap.slice(0, 5).map(([title], i) => (
          <li key={title} className="flex h-11 items-center">
            <span className="mr-2 text-black">{i + 1}</span>
            <span>{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
