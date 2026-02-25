"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { Review } from "@/types/addReview";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { closeModal } from "@/lib/store/modal";
import ReviewItem from "../ui/review/ReviewItem";

export default function MyReviewModal({
  dateStr,
}: {
  dateStr: string | undefined;
}) {
  const dispatch = useDispatch();
  const formattedDate = dayjs(dateStr).format("YYYY년 MM월 DD일");

  const queryClient = useQueryClient();
  const myReviews: Review[] | undefined = queryClient.getQueryData([
    "myReviews",
  ]);

  const myReviewsForDate = myReviews?.filter((myReview) => {
    const selectedDateStr = myReview.createdAt.split("T")[0];
    return selectedDateStr === dateStr;
  });

  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center bg-black/60 sm:items-center">
      <div className="z-20 max-h-[90vh] w-full animate-bottom-up overflow-y-auto rounded-t-2xl bg-white p-7 sm:max-w-lg sm:animate-none sm:rounded-xl sm:p-10">
        <div
          className="mb-8 flex cursor-pointer justify-end"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          <Image
            src="/images/close-button.svg"
            alt="닫기 버튼"
            width={24}
            height={24}
          />
        </div>
        <h2 className="text-center text-xl font-medium">{formattedDate}</h2>
        <ul className="mt-10 flex flex-col gap-8">
          {myReviewsForDate?.map((review) => (
            <li key={review.id}>
              <ReviewItem review={review} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
