import { Genre } from "@/types/movie";
import PosterImage from "./PosterImage";
import VoteAverage from "./VoteAverage";
import MovieInfo from "./MovieInfo";
import ReviewHeader from "./ReviewHeader";

export interface ReviewCardProps {
  userName?: string;
  posterPath: string;
  title: string;
  genres: Genre[];
  runtime: number;
  voteAverage?: string;
  createdAt?: Date;
}

export default function ReviewFeedCard({
  userName,
  posterPath,
  title,
  genres,
  runtime,
  voteAverage,
  createdAt,
}: ReviewCardProps) {
  return (
    <>
      <ReviewHeader userName={userName} createdAt={createdAt} variant="feed" />
      <div className="relative flex h-auto items-start gap-4">
        <PosterImage posterPath={posterPath} size="sm" />
        {/* Info */}
        <div className="flex h-[155px] w-full flex-col items-start justify-between">
          <div className="w-full text-left">
            <MovieInfo title={title} genres={genres} runtime={runtime} />
          </div>
          <VoteAverage voteAverage={voteAverage} size="sm" />
        </div>
      </div>
    </>
  );
}
