"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { addReview } from "@/actions/addReview";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import Input from "../ui/input";
import Button from "../ui/button";

export default function ReviewForm() {
  const [formState, setFormState] = useState({
    voteAverage: "",
    date: "",
    review: "",
  });
  const today = dayjs().format("YYYY.MM.DD");
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return null;
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "voteAverage") {
      const raw = value.replace(/\D/g, "");

      if (raw === "") {
        setFormState((prev) => ({ ...prev, voteAverage: "" }));
        return;
      }

      const number = parseInt(raw, 10);

      if (number >= 0 && number <= 100) {
        const rating = (number / 10).toFixed(1);
        setFormState((prev) => ({ ...prev, voteAverage: rating }));
      }
      return;
    }

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const voteInvalid = !formState.voteAverage;
  const dateInvalid = !formState.date;
  const reviewInvalid = !formState.review || formState.review.trim() === "";

  const formInvalid = voteInvalid || dateInvalid || reviewInvalid;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (formInvalid) {
      return;
    }

    await addReview(formData, user);
  };

  const handleReset = () => {
    setFormState({
      voteAverage: "",
      date: "",
      review: "",
    });

    router.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <Input
          label="평점"
          type="text"
          inputMode="numeric"
          name="voteAverage"
          placeholder="0.0"
          value={formState.voteAverage}
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
          iconClassName="absolute top-1/2 -translate-y-1/2 left-3 z-10"
        />
        <Input
          label="시청 날짜"
          type="text"
          name="date"
          value={formState.date}
          onChange={handleChange}
          placeholder={today}
          pattern="\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])"
          className="h-9 w-32 p-4"
        />
      </div>
      <div className="absolute left-0 top-48">
        <textarea
          name="review"
          value={formState.review}
          onChange={handleChange}
          placeholder="리뷰를 작성하세요"
          className="text-4 min-h-64 w-full resize-none rounded-lg border border-gray p-4 font-medium focus:z-10 focus:outline-none"
        />

        <Button
          type="submit"
          disabled={formInvalid}
          className={`mb-3 mt-10 w-full ${formInvalid ? "bg-gray600" : "bg-blue"}`}
        >
          등록하기
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          className="w-full bg-danger"
        >
          작성 취소하기
        </Button>
      </div>
    </form>
  );
}
