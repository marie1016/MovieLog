import { Genre } from "@/types/movie";
import clsx from "clsx";
import PosterImage from "./PosterImage";
import MovieInfo from "./MovieInfo";
import VoteAverage from "./VoteAverage";
import ReviewDropdown from "../ui/ReviewDropdown";

export interface ReviewContentProps {
  posterPath: string;
  title: string;
  genres: Genre[];
  runtime: number;
  voteAverage?: string;
  variant?: "modal";
  size?: "sm" | "lg";
}

export default function ReviewInfo({
  posterPath,
  title,
  genres,
  runtime,
  voteAverage,
  variant,
  size = "sm",
}: ReviewContentProps) {
  const dimension = size === "lg" ? "h-[256px]" : "h-[155px]";
  const gap = size === "lg" ? "gap-1" : "gap-0";
  const text = size === "lg" && "text-2xl";

  return (
    <div className="relative flex h-auto items-start gap-4">
      <PosterImage posterPath={posterPath} size={size} />
      {/* Info */}
      <div
        className={clsx(
          dimension,
          "flex w-full flex-col items-start justify-between",
        )}
      >
        <div className={clsx(gap, text, "flex flex-col")}>
          <MovieInfo title={title} genres={genres} runtime={runtime} />
        </div>
        <VoteAverage voteAverage={voteAverage} size={size} variant={variant} />
      </div>

      {variant !== "modal" && <ReviewDropdown />}
    </div>
  );
}
