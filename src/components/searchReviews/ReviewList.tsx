"use client";

import { Review } from "@/types/addReview";
import { useSearchReviews } from "@/hooks/useSearchReviews";
import ReviewItem from "../ui/review/ReviewItem";

interface ReviewListProps {
  reviews: Review[] | undefined;
  title: string;
}

export default function ReviewList({ reviews, title }: ReviewListProps) {
  const { searchResults, error, isFetching } = useSearchReviews(reviews, title);

  if (error) {
    throw new Error("검색한 리뷰 데이터를 불러오는 중 오류가 발생했습니다.");
  }

  if (searchResults?.length === 0)
    return (
      <div className="py-32 text-center text-lg">
        <p>아직 등록된 리뷰가 없습니다.</p>
        <p className="text-gray600">이 영화의 첫 번째 리뷰를 남겨보세요.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 justify-between gap-12 lg:grid-cols-[380px_380px] lg:gap-14">
      {searchResults?.map((review: Review) => (
        <div key={review.id}>
          <ReviewItem review={review} isFetching={isFetching} />
        </div>
      ))}
    </div>
  );
}
