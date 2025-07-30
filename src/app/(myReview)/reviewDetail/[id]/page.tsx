import ReviewDetail from "@/components/reviewDetail/ReviewDetail";
import ReviewsForSameMovie from "@/components/reviewDetail/ReviewsForSameMovie";
import SimilarMovies from "@/components/reviewDetail/SimilarMovies";

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
      <ReviewDetail id={id} />
      <h1 className="mb-6 mt-14 text-4xl font-medium">비슷한 영화</h1>
      <SimilarMovies genreId={genreId} />
      <h1 className="mb-6 mt-14 text-4xl font-medium">다른 기록</h1>
      <ReviewsForSameMovie title={title} id={id} />
    </div>
  );
}
