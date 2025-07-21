"use client";

import { Genre } from "@/types/movie";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { getElapsedTime } from "@/lib/utils/getElapsedTime";
import { changeCreatedAtToDate } from "@/lib/utils/changeCreatedAtToDate";
import clsx from "clsx";

const BASE_POSTER_PATH = "https://image.tmdb.org/t/p";

export interface ReviewCardProps {
  id?: string;
  userName?: string;
  posterPath: string;
  title: string;
  genres: Genre[];
  runtime: number;
  feed?: boolean;
  detail?: boolean;
  voteAverage?: string;
  date?: string;
  review?: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function ReviewCard({
  id,
  userName,
  posterPath,
  title,
  genres,
  runtime,
  feed,
  detail,
  voteAverage,
  date,
  review,
  createdAt,
}: ReviewCardProps) {
  const fullPosterPath = `${BASE_POSTER_PATH}/w500${posterPath}`;
  const today = dayjs().format("YYYY.MM.DD");
  const genreId = genres[0]?.id;
  const createdAtToDate = createdAt ? changeCreatedAtToDate(createdAt) : "";

  return (
    <>
      {detail && (
        <div className="mb-6 text-center text-4xl font-medium">{userName}</div>
      )}
      <div
        className={clsx(
          "mb-3 flex",
          detail ? "justify-end" : "justify-between",
        )}
      >
        {!detail && <span>{userName}</span>}
        <span className={clsx(detail ? "text-xl" : "text-sm", "text-gray600")}>
          {feed && createdAtToDate ? getElapsedTime(createdAtToDate) : today}
        </span>
      </div>

      <div className="flex h-auto items-start gap-4">
        {/* Poster */}
        <div
          className={clsx(
            detail ? "h-[256px] w-[216px]" : "h-[155px] w-[130px]",
            "flex shrink-0 items-center justify-center rounded-xl border border-gray shadow-lg",
          )}
        >
          <div
            className={clsx(
              "relative aspect-[2/3]",
              detail ? "w-[150px]" : "w-[90px]",
            )}
          >
            <Image
              src={fullPosterPath}
              alt="영화 포스터"
              sizes="90px"
              fill
              priority
            />
          </div>
        </div>
        {/* Info */}
        <div
          className={clsx(
            "flex w-full flex-col justify-between",
            detail ? "h-[256px] text-2xl" : "h-[155px]",
          )}
        >
          <div className={clsx(detail && "flex flex-col gap-3")}>
            <span>{title}</span>
            <div className="flex gap-2 text-gray600">
              {genres.slice(0, 2).map((genre) => (
                <div key={genre.id}>{genre.name}</div>
              ))}
            </div>
            <div className="text-gray600">{runtime}분</div>
          </div>

          {feed && (
            <div className="flex items-center gap-[2px] text-gray600">
              <Image
                src="/images/blue-star.svg"
                alt="평점 아이콘"
                width={detail ? 24 : 20}
                height={detail ? 24 : 20}
              />
              <span className={clsx(detail && "text-xl")}>{voteAverage}</span>
            </div>
          )}
        </div>
      </div>

      {/* Review */}
      {feed && (
        <div className={clsx("mt-4", detail && "text-2xl")}>
          <span
            className={clsx(detail ? "text-xl" : "text-sm", "text-gray600")}
          >
            {date}
          </span>

          {detail ? (
            <div className="mt-2 min-h-36">{review}</div>
          ) : (
            <div className="min-h-20 cursor-pointer hover:underline">
              <Link
                href={`/reviewDetail/${id}?title=${title}&genreId=${genreId}`}
              >
                {review}
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
