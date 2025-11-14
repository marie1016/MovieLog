"use client";

import { getElapsedTime } from "@/lib/utils/getElapsedTime";
import dayjs from "dayjs";

interface ReviewHeaderProps {
  userName?: string | undefined;
  createdAt?: Date | undefined;
  variant?: "feed" | "detail";
}

export default function ReviewHeader({
  userName,
  createdAt,
  variant = "feed",
}: ReviewHeaderProps) {
  const isDetail = variant === "detail";
  const today = dayjs().format("YYYY.MM.DD");
  const reviewDate = createdAt ? getElapsedTime(createdAt) : today;

  return isDetail ? (
    <>
      <div className="mb-6 text-center text-2xl font-medium">{userName}</div>
      <div className="mb-3 flex justify-end">
        <span className="text-base text-gray600">{reviewDate}</span>
      </div>
    </>
  ) : (
    <div className="mb-3 flex justify-between">
      <span>{userName}</span>
      <span className="text-sm text-gray600">{reviewDate}</span>
    </div>
  );
}
