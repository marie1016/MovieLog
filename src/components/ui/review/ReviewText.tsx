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
  variant?: "feed" | "detail";
}

export default function ReviewText({
  id,
  title,
  genres,
  date,
  review,
  variant = "feed",
}: ReviewTextProps) {
  const genreId = genres[0]?.id;

  const isDetail = variant === "detail";

  return (
    <div className={clsx("mt-4 text-left", isDetail && "text-2xl")}>
      <span className={clsx(isDetail ? "text-xl" : "text-sm", "text-gray600")}>
        {date}
      </span>

      {isDetail ? (
        <div className="mt-2 min-h-36">{review}</div>
      ) : (
        <div className="min-h-20 cursor-pointer hover:underline">
          <Link href={`/reviewDetail/${id}?title=${title}&genreId=${genreId}`}>
            {review}
          </Link>
        </div>
      )}
    </div>
  );
}
