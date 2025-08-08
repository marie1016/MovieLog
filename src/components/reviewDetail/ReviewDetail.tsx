"use client";

import { ReviewPage } from "@/lib/firebase/getReviews";
import { Review } from "@/types/addReview";
import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import PosterImage from "../mainPage/PosterImage";
import VoteAverage from "../mainPage/VoteAverage";
import ReviewText from "../addReview/ReviewText";
import MovieInfo from "../mainPage/MovieInfo";
import ReviewHeader from "../mainPage/ReviewHeader";

export default function ReviewDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();

  if (isRestoring) return <p>loading</p>;

  const reviews = queryClient.getQueryData<InfiniteData<ReviewPage>>([
    "reviews",
  ]);
  const myReviews = queryClient.getQueryData<Review[]>(["myReviews"]);

  const flattenedReviews = reviews?.pages.flatMap((p) => p.reviewsData);

  const review =
    myReviews?.find((r) => r.id === id) ||
    flattenedReviews?.find((r) => r.id === id) ||
    null;

  if (!review) return null;

  const {
    userName,
    createdAt,
    posterPath,
    title,
    genres,
    runtime,
    voteAverage,
  } = review;

  return (
    <>
      <ReviewHeader userName={userName} createdAt={createdAt} />
      <div className="flex h-auto items-start gap-4">
        <PosterImage posterPath={posterPath} size="lg" />
        {/* Info */}
        <div className="flex h-[155px] h-[256px] w-full flex-col items-start justify-between text-2xl">
          <div className="flex flex-col gap-3">
            <MovieInfo title={title} genres={genres} runtime={runtime} />
          </div>
          <VoteAverage voteAverage={voteAverage} size="lg" />
        </div>
      </div>
      <ReviewText {...review} variant="detail" />
    </>
  );
}
