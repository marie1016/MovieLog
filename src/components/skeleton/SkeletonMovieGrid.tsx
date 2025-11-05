import { SkeletonMovieCard } from "./SkeletonMovieCarousel";

export default function SkeletonMovieGrid() {
  return (
    <ul className="my-6 flex max-w-[490px] flex-wrap justify-center rounded-xl bg-white p-6 sm:max-w-7xl sm:justify-start">
      {Array.from({ length: 9 }, (_, i) => (
        <li
          key={i}
          className="flex justify-center py-3 sm:basis-1/2 lg:basis-1/3"
        >
          <SkeletonMovieCard />
        </li>
      ))}
    </ul>
  );
}
