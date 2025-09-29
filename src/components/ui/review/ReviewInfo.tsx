"use client";

import { Genre } from "@/types/movie";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import PosterImage from "./PosterImage";
import MovieInfo from "./MovieInfo";
import VoteAverage from "../VoteAverage";
import ReviewDropdown from "./ReviewDropdown";

export interface ReviewContentProps {
  userName?: string;
  id?: string;
  posterPath: string;
  title: string;
  genres: Genre[];
  runtime: number;
  voteAverage?: string;
  variant?: "modal";
  size?: "sm" | "lg";
}

export default function ReviewInfo({
  userName,
  id,
  posterPath,
  title,
  genres,
  runtime,
  voteAverage,
  variant,
  size = "sm",
}: ReviewContentProps) {
  const { user } = useSelector((state: RootState) => state.user);
  const dimension = size === "lg" ? "sm:h-[256px]" : "h-[155px]";
  const gap = size === "lg" ? "gap-1" : "gap-0";
  const text = size === "lg" && "text-2xl";

  return (
    <div className="flex w-full justify-between gap-2">
      <div className="flex h-auto w-full items-start gap-4">
        <PosterImage posterPath={posterPath} size={size} title={title} />
        {/* Info */}
        <div
          className={clsx(
            dimension,
            "flex h-[155px] w-auto flex-col items-start justify-between",
          )}
        >
          <div className={clsx(gap, text, "flex flex-col text-left")}>
            <MovieInfo title={title} genres={genres} runtime={runtime} />
          </div>
          <VoteAverage
            voteAverage={voteAverage}
            size={size}
            variant={variant}
          />
        </div>
      </div>
      {variant !== "modal" && user?.displayName === userName && (
        <ReviewDropdown id={id} />
      )}
    </div>
  );
}
