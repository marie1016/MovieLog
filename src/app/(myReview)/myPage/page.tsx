"use client";

import { RootState } from "@/lib/store";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const MyCalendar = dynamic(() => import("@/components/myPage/MyCalendar"), {
  ssr: false,
});

export default function MyPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const displayName = user?.displayName || "";

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-medium">{displayName}&apos;s 기록</h1>
      <div className="mb-16">
        <MyCalendar displayName={displayName} />
      </div>
    </div>
  );
}
