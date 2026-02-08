"use client";

import { Genre } from "@/types/movie";
import Link from "next/link";
import clsx from "clsx";

export interface ReviewTextProps {
  id?: string;
  title: string;
  genres: Genre[];
  date?: string;
  review?: string;
  size?: "sm" | "lg";
}

export default function ReviewText({
  id,
  title,
  genres,
  date,
  review,
  size = "sm",
}: ReviewTextProps) {
  const genreId = genres?.[0].id;

  const isLarge = size === "lg";

  return (
    <div className="mt-4 text-left">
      <span className={clsx(isLarge ? "text-base" : "text-sm", "text-gray600")}>
        {date}
      </span>

      {isLarge ? (
        <div className="mt-2 min-h-36 text-lg">{review}</div>
      ) : (
        <div className="line-clamp-5 min-h-20 cursor-pointer overflow-ellipsis hover:text-gray600">
          <Link href={`/reviewDetail/${id}?title=${title}&genreId=${genreId}`}>
            {review}
          </Link>
        </div>
      )}
    </div>
  );
}
