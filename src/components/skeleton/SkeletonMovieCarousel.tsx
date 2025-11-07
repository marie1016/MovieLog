export function SkeletonMovieCard() {
  return (
    <div className="flex h-80 w-56 items-center justify-center rounded-xl border border-gray shadow-lg">
      <div className="flex h-[284px] w-36 flex-col items-center justify-between">
        <div className="skeleton relative aspect-[2/3] w-36" />
        <div className="skeleton h-5 w-36" />
        <div className="skeleton h-5 w-16" />
      </div>
    </div>
  );
}

export function SkeletonMovieCarousel() {
  return (
    <section className="relative h-96 w-full rounded-xl bg-white">
      <ul className="carousel flex h-full snap-x snap-mandatory space-x-5 overflow-x-auto scroll-smooth px-10">
        {Array.from({ length: 5 }, (_, i) => (
          <li className="flex snap-center items-center" key={i}>
            <SkeletonMovieCard />
          </li>
        ))}
      </ul>
    </section>
  );
}
