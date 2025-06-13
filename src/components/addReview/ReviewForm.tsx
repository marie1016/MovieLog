"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { addReview } from "@/actions/addReview";
import Input from "../ui/input";
import Button from "../ui/button";

export default function ReviewForm() {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");

    if (raw === "") {
      setValue("");
      return;
    }

    const number = parseInt(raw, 10);

    if (number >= 0 && number <= 100) {
      const rating = (number / 10).toFixed(1);
      setValue(rating);
    }
  };
  return (
    <form action={addReview}>
      <div className="flex justify-between">
        <Input
          label="평점"
          type="text"
          inputMode="numeric"
          name="voteAverage"
          placeholder="0.0"
          value={value}
          onChange={handleChange}
          className="h-9 w-20 pl-8"
          icon={
            <Image
              src="/images/blue-star.svg"
              alt="blue-star"
              width={20}
              height={20}
            />
          }
          iconClassName="absolute top-1/2 -translate-y-1/2 left-3"
        />
        <Input
          label="시청 날짜"
          type="text"
          name="date"
          placeholder="YYYY.MM.DD"
          className="h-9 w-32 p-2"
        />
      </div>
      <div className="absolute left-0 top-48">
        <textarea
          name="review"
          placeholder="리뷰를 작성하세요"
          className="text-4 min-h-64 w-full rounded-lg border border-gray p-4 font-medium focus:z-10 focus:outline-none"
        />
        <Button type="submit" className="mb-3 mt-10 w-full bg-blue">
          등록하기
        </Button>
        <Button type="reset" className="w-full bg-gray600">
          작성 취소하기
        </Button>
      </div>
    </form>
  );
}
