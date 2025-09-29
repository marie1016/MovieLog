import { getRecentTopReviewedMovies } from "@/lib/firebase/getRecentTopReviewedMovies";
import Link from "next/link";

export default async function RankingBox() {
  const sortedTitleMap = await getRecentTopReviewedMovies();

  return (
    <div className="relative h-11 max-w-80 overflow-hidden rounded-xl border border-gray bg-white px-5 lg:h-auto lg:px-8 lg:py-6">
      <ul className="flex animate-slide-up flex-col items-start font-medium text-gray600 lg:animate-none">
        {sortedTitleMap.slice(0, 5).map(([title], i) => (
          <Link
            key={title}
            href={`/searchReviews?query=${title}`}
            className="flex h-11 w-full items-center hover:bg-gray100"
          >
            <span className="mr-2 text-black">{i + 1}</span>
            <span className="truncate">{title}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}
