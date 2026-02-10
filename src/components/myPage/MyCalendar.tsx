"use client";

import Image from "next/image";
import Calendar, { TileArgs } from "react-calendar";
import { useState } from "react";
import clsx from "clsx";
import { useIsRestoring } from "@tanstack/react-query";
import { useMyReviews } from "@/hooks/queries/useMyReviews";
import TileContent from "./TileContent";

export default function MyCalendar({ displayName }: { displayName: string }) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const isRestoring = useIsRestoring();

  const { reviewsData, isFetching, isError } = useMyReviews(displayName);

  if (isFetching || isRestoring)
    return (
      <Image
        src="/images/dots-rotate.svg"
        width={60}
        height={60}
        alt="로딩스피너"
        className="mx-auto mt-36"
      />
    );

  if (isError || !reviewsData) {
    throw new Error("내 리뷰 데이터를 불러오는 중 오류가 발생했습니다.");
  }

  const renderTileContent = (props: TileArgs) => (
    <TileContent date={props.date} reviewsData={reviewsData} />
  );

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
