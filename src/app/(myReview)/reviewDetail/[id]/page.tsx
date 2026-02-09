import ReviewDetailSection from "@/components/reviewDetail/ReviewDetailSection";
import ReviewsForSameMovie from "@/components/reviewDetail/ReviewsForSameMovie";
import SimilarMovies from "@/components/reviewDetail/SimilarMovies";
import { SkeletonMovieCarousel } from "@/components/skeleton/SkeletonMovieCarousel";
import SkeletonReviewHeader, {
  SkeletonReviewInfo,
} from "@/components/skeleton/SkeletonReviewDetail";
import { SkeletonReviewsForSameMovie } from "@/components/skeleton/SkeletonReviewsForSameMovie";
import { Suspense } from "react";

export default function ReviewDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { genreId: string; title: string };
}) {
  const { id } = params;
  const { genreId, title } = searchParams;

  return (
    <div className="mx-auto max-w-4xl">
      <Suspense
        fallback={
          <>
            <SkeletonReviewHeader size="lg" />
            <SkeletonReviewInfo size="lg" />
          </>
        }
      >
        <ReviewDetailSection id={id} />
      </Suspense>
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
