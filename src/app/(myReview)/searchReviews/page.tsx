"use client";

import ReviewText from "@/components/addReview/ReviewText";
import ReviewHeader from "@/components/mainPage/ReviewHeader";
import ReviewInfo from "@/components/mainPage/ReviewInfo";
import useSearchReviews from "@/hooks/useSearchReviews";
import { Review } from "@/types/addReview";
import { useSearchParams } from "next/navigation";

export default function SearchReviewsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const decodedQuery = query ? decodeURIComponent(query) : "";

  const { searchResults } = useSearchReviews(decodedQuery, 500);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-1 justify-between gap-12 lg:grid-cols-[380px_380px] lg:gap-14">
        {searchResults.map((review: Review) => (
          <div key={review.id}>
            <ReviewHeader {...review} />
            <ReviewInfo {...review} />
            <ReviewText {...review} />
          </div>
        ))}
      </div>
    </div>
  );
}
