import { getReviews } from "@/lib/firebase/getReviews";
import ReviewCard from "../addReview/ReviewCard";

export default async function ReviewFeed() {
  const reviews = await getReviews();

  return (
    <div className="grid grid-cols-1 justify-between md:grid-cols-[repeat(2,_minmax(280px,_1fr))] md:gap-12">
      {reviews.map((review) => (
        <div key={review.id}>
          <ReviewCard
            posterPath={review.posterPath}
            title={review.title}
            genres={review.genres}
            runtime={review.runtime}
            voteAverage={review.voteAverage}
            date={review.date}
            review={review.review}
            feed
          />
        </div>
      ))}
    </div>
  );
}
