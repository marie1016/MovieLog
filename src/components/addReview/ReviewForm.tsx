"use client";

import Image from "next/image";
import { addReview } from "@/actions/addReview";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { handleVoteAverageChange } from "@/lib/utils/handleVoteAverageChange";
import { FormStateType } from "@/types/addReview";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/input";
import Button from "../ui/button";

export default function ReviewForm() {
  const today = dayjs().format("YYYY.MM.DD");
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      voteAverage: "",
      date: "",
      review: "",
    },
  });

  if (!user) {
    return null;
  }

  const onSubmit: SubmitHandler<FormStateType> = async (values) => {
    if (!isValid) return;

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await addReview(formData, user);
  };

  const handleReset = () => {
    reset();
    router.back();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <Input
          {...register("voteAverage", { required: true })}
          label="평점"
          type="text"
          inputMode="numeric"
          placeholder="0.0"
          onChange={(e) => handleVoteAverageChange(e, setValue)}
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
          {...register("date", { required: true })}
          label="시청 날짜"
          type="text"
          placeholder={today}
          pattern="\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])"
          className="h-9 w-32 p-4"
        />
      </div>
      <div className="absolute left-0 top-48">
        <textarea
          {...register("review", {
            required: true,
            validate: (value) => value.trim() !== "",
          })}
          placeholder="리뷰를 작성하세요"
          className="text-4 min-h-64 w-full resize-none rounded-lg border border-gray p-4 font-medium focus:z-10 focus:outline-none"
        />

        <Button
          type="submit"
          disabled={!isValid}
          className={`mb-3 mt-10 w-full ${!isValid ? "bg-gray600" : "bg-blue"}`}
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
