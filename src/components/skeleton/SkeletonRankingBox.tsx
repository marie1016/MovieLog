export default function SkeletonRankingBox() {
  return (
    <div className="relative h-11 w-60 max-w-80 overflow-hidden rounded-xl border border-gray bg-white px-5 lg:h-auto lg:w-auto lg:px-8 lg:py-6">
      <ul className="flex animate-slide-up flex-col items-start font-medium text-gray600 lg:animate-none">
        {Array.from({ length: 5 }, (_, i) => (
          <li key={i} className="flex h-11 w-full items-center">
            <span className="mr-2 text-black">{i + 1}</span>
            <div className="skeleton my-2.5 h-6 w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
