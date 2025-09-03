"use client";

import { BASE_POSTER_PATH } from "@/lib/constants/basePath";
import { Review } from "@/types/addReview";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/store/modal";
import dayjs from "dayjs";

export default function TileContent({
  date,
  reviewsData,
}: {
  date: Date;
  reviewsData: Review[];
}) {
  const dateStr = dayjs(date).format("YYYY-MM-DD");
  const dispatch = useDispatch();

  const posters = reviewsData
    .filter((review) => {
      const reviewDateStr = dayjs(review.createdAt).format("YYYY-MM-DD");
      return reviewDateStr === dateStr;
    })
    .map((review) => review.posterPath);

  return (
    <div className="relative flex h-16 w-full justify-center sm:h-20">
      {posters.slice(0, 1).map((url, i) => {
        const posterPath = `${BASE_POSTER_PATH}/w500${url}`;
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            onClick={() =>
              dispatch(
                openModal({ modalType: "myReview", modalProps: { dateStr } }),
              )
            }
            className="relative top-1 aspect-[2/3] w-10 sm:w-[54px]"
          >
            <Image
              src={posterPath}
              alt="poster"
              className="transform object-cover transition hover:-translate-y-1 hover:scale-110"
              fill
              sizes="54px"
            />
          </div>
        );
      })}
      {posters.length > 1 && (
        <div className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white text-xs font-medium text-black">
          +{posters.length - 1}
        </div>
      )}
    </div>
  );
}
