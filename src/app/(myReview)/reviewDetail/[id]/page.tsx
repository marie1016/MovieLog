import ReviewDetail from "@/components/reviewDetail/ReviewDetail";
import ReviewsForSameMovie from "@/components/reviewDetail/ReviewsForSameMovie";
import SimilarMovies from "@/components/reviewDetail/SimilarMovies";
import { SkeletonMovieCarousel } from "@/components/skeleton/SkeletonMovieCarousel";
import { SkeletonReviewsForSameMovie } from "@/components/skeleton/SkeletonReviewsForSameMovie";
import { getReviewById } from "@/lib/firebase/getReviewById";
import { Suspense } from "react";

export default async function ReviewDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { genreId: string; title: string };
}) {
  const { id } = params;
  const { genreId, title } = searchParams;

  const reviewById = await getReviewById(id);

  return (
    <div className="mx-auto max-w-4xl">
      <ReviewDetail id={id} reviewById={reviewById} />
      <h1 className="mb-6 mt-14 text-2xl font-medium">비슷한 영화</h1>
      <Suspense fallback={<SkeletonMovieCarousel />}>
        <SimilarMovies genreId={genreId} />
      </Suspense>
      <h1 className="mb-6 mt-14 text-2xl font-medium">다른 기록</h1>
      <Suspense fallback={<SkeletonReviewsForSameMovie />}>
        <ReviewsForSameMovie title={title} id={id} />
      </Suspense>
    </div>
  );
}
