"use client";

import { BASE_POSTER_PATH } from "@/lib/constants/basePath";
import { Review } from "@/types/addReview";
import clsx from "clsx";
import Image from "next/image";

export default function TileContent({
  date,
  reviewsData,
}: {
  date: Date;
  reviewsData: Review[];
}) {
  const dateStr = date.toISOString().split("T")[0];

  const posters = reviewsData
    .filter((review) => {
      const reviewDateStr = review.createdAt.toISOString().split("T")[0];
      return reviewDateStr === dateStr;
    })
    .map((review) => review.posterPath);

  return (
    <div className="relative h-16 w-full sm:h-20">
      <ul
        className={clsx(
          posters.length > 0 && "calendar-carousel",
          "flex snap-x snap-mandatory overflow-x-auto scroll-smooth",
        )}
      >
        {posters.map((url, i) => {
          const posterPath = `${BASE_POSTER_PATH}/w500${url}`;
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="relative top-1 flex w-full shrink-0 snap-center justify-center"
            >
              <div className="relative aspect-[2/3] w-10 sm:w-[54px]">
                <Image
                  src={posterPath}
                  alt="poster"
                  className="transform object-cover transition hover:-translate-y-1 hover:scale-110"
                  fill
                  sizes="54px"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
