export function SkeletonReviewsForSameMovie() {
  return (
    <ul className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14">
      {Array.from({ length: 4 }, (_, i) => (
        <li key={i}>
          <div className="mb-3 flex justify-between">
            <div className="skeleton h-5 w-1/5" />
            <div className="skeleton h-5 w-1/5" />
          </div>

          <div className="skeleton h-5 w-1/6" />
          <div className="mt-5 h-20">
            <div className="skeleton h-5 w-full" />
            <div className="skeleton mt-1 h-5 w-2/3" />
          </div>
        </li>
      ))}
    </ul>
  );
}
