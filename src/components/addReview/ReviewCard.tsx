"use client";

import { Genre } from "@/types/movie";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { getElapsedTime } from "@/lib/utils/getElapsedTime";

const BASE_POSTER_PATH = "https://image.tmdb.org/t/p";

export interface ReviewCardProps {
  id?: string;
  userName?: string;
  posterPath: string;
  title: string;
  genres: Genre[];
  runtime: number;
  feed?: boolean;
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
  voteAverage,
  date,
  review,
  createdAt,
}: ReviewCardProps) {
  const fullPosterPath = `${BASE_POSTER_PATH}/w500${posterPath}`;
  const today = dayjs().format("YYYY.MM.DD");

  let createdAtToDate;
  if (createdAt) {
    createdAtToDate = new Date(
      createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000,
    );
  }

  return (
    <>
      <div className="mb-3 flex justify-between">
        <span>{userName}</span>
        <span className="text-sm text-gray600">
          {feed && createdAtToDate ? getElapsedTime(createdAtToDate) : today}
        </span>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-[155px] w-[130px] shrink-0 items-center justify-center rounded-xl border border-gray shadow-lg">
          <div className="relative aspect-[2/3] w-[90px]">
            <Image
              src={fullPosterPath}
              alt="영화 포스터"
              sizes="90px"
              fill
              priority
            />
          </div>
        </div>
        <div className="flex h-[155px] w-full flex-col justify-between">
          <div>
            <span>{title}</span>
            <div className="flex gap-2 text-gray600">
              {genres.slice(0, 2).map((genre) => (
                <div key={genre.id}>{genre.name}</div>
              ))}
            </div>
            <div className="text-gray600">{runtime}분</div>
          </div>

          {feed ? (
            <div className="flex items-center gap-[2px] text-gray600">
              <Image
                src="/images/blue-star.svg"
                alt="평점 아이콘"
                width={20}
                height={20}
              />
              <span>{voteAverage}</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {feed ? (
        <div className="mt-4">
          <span className="text-sm text-gray600">{date}</span>
          <div className="h-20 cursor-pointer hover:underline">
            <Link href={`/reviewDetail/${id}`}>{review}</Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
