export default function SkeletonRankingBox() {
  return (
    <div className="relative h-11 w-60 max-w-80 overflow-hidden rounded-xl border border-gray bg-white px-5 lg:h-auto lg:w-auto lg:px-8 lg:py-6">
      <ul className="flex animate-slide-up flex-col items-start font-medium text-gray600 lg:animate-none">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="skeleton my-2.5 h-6 w-full" />
        ))}
      </ul>
    </div>
  );
}
