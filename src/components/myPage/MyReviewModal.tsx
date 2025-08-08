"use client";

import { useRef } from "react";
import dayjs from "dayjs";
import { Review } from "@/types/addReview";
import { useQueryClient } from "@tanstack/react-query";
import ReviewCard from "../addReview/ReviewText";

export default function MyReviewModal({
  dateStr,
  closeModal,
}: {
  dateStr: string;
  closeModal: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const queryClient = useQueryClient();
  const myReviews: Review[] | undefined = queryClient.getQueryData([
    "myReviews",
  ]);

  const formattedDate = dayjs(dateStr).format("YYYY년 MM월 DD일");

  const myReviewsForDate = myReviews?.filter((myReview) => {
    const selectedDateStr = myReview.createdAt.toISOString().split("T")[0];
    return selectedDateStr === dateStr;
  });

  const clickBackdrop = (e: React.MouseEvent) => {
    if (e.target !== dialogRef.current) {
      closeModal();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-10 h-screen w-screen bg-black/60"
        onClick={clickBackdrop}
      />
      <dialog
        className="modal-scrollbar fixed inset-0 z-20 mt-20 h-full w-screen overflow-y-auto rounded-xl bg-white p-7 sm:mb-20 sm:max-h-[calc(100vh-10rem)] sm:w-[480px] sm:px-14 sm:py-10"
        ref={dialogRef}
        open
      >
        <h2 className="text-center text-2xl font-medium">{formattedDate}</h2>
        <ul className="mt-10 flex flex-col gap-8">
          {myReviewsForDate?.map((review) => (
            <li key={review.id}>
              <ReviewCard {...review} feed />
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
