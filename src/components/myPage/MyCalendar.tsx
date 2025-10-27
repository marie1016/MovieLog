"use client";

import { Review } from "@/types/addReview";
import Calendar, { TileArgs } from "react-calendar";
import { useState } from "react";
import clsx from "clsx";
import { useIsRestoring, useQuery } from "@tanstack/react-query";
import { getMyReviews } from "@/lib/firebase/getMyReviews";
import TileContent from "./TileContent";

export default function MyCalendar({
  initialMyReviews,
  displayName,
}: {
  initialMyReviews: Review[];
  displayName: string;
}) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const isRestoring = useIsRestoring();

  const { data } = useQuery<Review[]>({
    queryKey: ["myReviews"],
    queryFn: async () => getMyReviews(displayName),
    initialData: initialMyReviews,
    staleTime: 60 * 60 * 1000,
    meta: { persist: true },
  });

  const renderTileContent = (props: TileArgs) => (
    <TileContent date={props.date} reviewsData={data} />
  );

  if (isRestoring) return <p>loading</p>;
  return (
    <>
      <div className="text-right">
        <button
          className="font-medium text-blue"
          onClick={() => setStartDate(new Date())}
        >
          Today
        </button>
      </div>
      <Calendar
        activeStartDate={startDate || new Date()}
        onActiveStartDateChange={({ activeStartDate }) =>
          setStartDate(activeStartDate)
        }
        tileContent={renderTileContent}
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";
          const isCurrentMonth = startDate?.getMonth() === date.getMonth();
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          return clsx(
            isCurrentMonth ? "bg-white" : "text-text-gray500",
            isWeekend && "text-blue",
          );
        }}
        defaultView="month"
        locale="ko-KR"
        formatDay={(locale, date) => String(date.getDate())}
        view="month"
        calendarType="hebrew"
      />
    </>
  );
}
