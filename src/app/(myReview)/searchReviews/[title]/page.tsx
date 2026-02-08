import { getReviewsForSameMovie } from "@/lib/firebase/getReviewsForSameMovie";
import ReviewList from "@/components/searchReviews/ReviewList";

export default async function SearchReviewsPage({
  params,
}: {
  params: { title: string };
}) {
  const title = decodeURIComponent(params.title);

  const reviews = await getReviewsForSameMovie(title);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-5 text-center text-2xl font-medium md:mb-7">
        &apos;{title}&apos;
      </h1>
      <ReviewList reviews={reviews} title={title} />
    </div>
  );
}
