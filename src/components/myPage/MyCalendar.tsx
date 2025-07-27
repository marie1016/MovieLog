"use client";

import { Review } from "@/types/addReview";
import Calendar, { TileArgs } from "react-calendar";
import { useState } from "react";
import TileContent from "./TileContent";

export default function MyCalendar({ reviewsData }: { reviewsData: Review[] }) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const renderTileContent = (props: TileArgs) => (
    <TileContent date={props.date} reviewsData={reviewsData} />
  );
  return (
    <>
      <div className="text-right">
        <button
          className="text-lg font-medium text-blue"
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

          return isCurrentMonth ? "bg-white" : "text-text-gray500";
        }}
        defaultView="month"
        locale="ko-KR"
        formatDay={(locale, date) => String(date.getDate())}
        view="month"
      />
    </>
  );
}
