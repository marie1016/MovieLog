import { SkeletonMovieCarousel } from "@/components/skeleton/SkeletonMovieCarousel";

export default function Loading() {
  return (
    <>
      <h1 className="text-2xl font-medium">영화</h1>
      <div className="my-4 flex h-10 items-center gap-5 md:justify-between">
        <div className="skeleton h-6 w-3/5" />
        <div className="skeleton h-6 w-1/6" />
      </div>
      <SkeletonMovieCarousel />
    </>
  );
}
