"use client";

import ReviewText from "@/components/ui/review/ReviewText";
import ReviewHeader from "@/components/ui/review/ReviewHeader";
import ReviewInfo from "@/components/ui/review/ReviewInfo";
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
      <h1 className="mb-5 text-center text-2xl font-medium md:mb-7">
        &apos;{decodedQuery}&apos;
      </h1>
      {!searchResults.length ? (
        <div className="py-32 text-center text-lg">
          <p>아직 등록된 리뷰가 없습니다.</p>
          <p className="text-gray600">이 영화의 첫 번째 리뷰를 남겨보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-between gap-12 lg:grid-cols-[380px_380px] lg:gap-14">
          {searchResults.map((review: Review) => (
            <div key={review.id}>
              <ReviewHeader {...review} />
              <ReviewInfo {...review} />
              <ReviewText {...review} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
