"use client";

import { BASE_POSTER_PATH } from "@/lib/constants/basePath";
import { Review } from "@/types/addReview";
import Image from "next/image";
import { useRef } from "react";
import MyReviewModal from "./MyReviewModal";

export default function TileContent({
  date,
  reviewsData,
}: {
  date: Date;
  reviewsData: Review[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dateStr = date.toISOString().split("T")[0];

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const posters = reviewsData
    .filter((review) => {
      const reviewDateStr = review.createdAt.toISOString().split("T")[0];
      return reviewDateStr === dateStr;
    })
    .map((review) => review.posterPath);

  return (
    <>
      <div className="relative flex h-16 w-full justify-center sm:h-20">
        {posters.slice(0, 1).map((url, i) => {
          const posterPath = `${BASE_POSTER_PATH}/w500${url}`;
          return (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              onClick={openModal}
              className="relative top-1 aspect-[2/3] w-10 sm:w-[54px]"
            >
              <Image
                src={posterPath}
                alt="poster"
                className="transform object-cover transition hover:-translate-y-1 hover:scale-110"
                fill
                sizes="54px"
              />
            </button>
          );
        })}
        {posters.length > 1 && (
          <div className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white text-xs font-medium text-black">
            +{posters.length - 1}
          </div>
        )}
      </div>
      <MyReviewModal dateStr={dateStr} dialogRef={dialogRef} />
    </>
  );
}
