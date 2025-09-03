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
    <div className="relative flex h-auto items-start gap-4">
      <PosterImage posterPath={posterPath} size={size} />
      {/* Info */}
      <div
        className={clsx(
          dimension,
          "flex h-[155px] w-full flex-col items-start justify-between",
        )}
      >
        <div className={clsx(gap, text, "flex flex-col text-left")}>
          <MovieInfo title={title} genres={genres} runtime={runtime} />
        </div>
        <VoteAverage voteAverage={voteAverage} size={size} variant={variant} />
      </div>

      {variant !== "modal" && user?.displayName === userName && (
        <ReviewDropdown id={id} />
      )}
    </div>
  );
}
