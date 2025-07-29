"use client";

import dayjs from "dayjs";
import { Review } from "@/types/addReview";
import { useQueryClient } from "@tanstack/react-query";
import ReviewCard from "../addReview/ReviewCard";

export default function MyReviewModal({
  dateStr,
  dialogRef,
}: {
  dateStr: string;
  dialogRef: React.RefObject<HTMLDialogElement>;
}) {
  const queryClient = useQueryClient();
  const myReviews: Review[] | undefined = queryClient.getQueryData([
    "myReviews",
  ]);
  const formattedDate = dayjs(dateStr).format("YYYY년 MM월 DD일");

  const myReviewsForDate = myReviews?.filter((myReview) => {
    const selectedDateStr = myReview.createdAt.toISOString().split("T")[0];
    return selectedDateStr === dateStr;
  });

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  return (
    <dialog
      className="fixed inset-0 z-20 mt-20 h-full w-full overflow-y-auto rounded-xl bg-white p-7 sm:mb-10 sm:max-h-[calc(100vh-10rem)] sm:w-[480px] sm:px-14 sm:py-10"
      onClick={closeModal}
      ref={dialogRef}
    >
      <h2 className="text-center text-2xl font-medium">{formattedDate}</h2>
      <div className="mt-10 flex flex-col gap-8">
        {myReviewsForDate?.map((review) => (
          <div key={review.id}>
            <ReviewCard {...review} feed />
          </div>
        ))}
      </div>
    </dialog>
  );
}
