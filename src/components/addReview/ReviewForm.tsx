"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { addReview } from "@/actions/addReview";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { handleVoteAverageChange } from "@/lib/utils/handleVoteAverageChange";
import { editReview } from "@/actions/editReview";
import { useForm } from "react-hook-form";
import { Genre } from "@/types/movie";
import Input from "../ui/input";
import Button from "../ui/button";

interface ReviewFormProps {
  movieId?: number;
  id?: string;
  posterPath: string;
  title: string;
  genres: Genre[];
  runtime: number;
  voteAverage?: string;
  date?: string;
  review?: string;
  closeEditModal?: () => void;
}

export default function ReviewForm({
  movieId,
  id,
  posterPath,
  title,
  genres,
  runtime,
  voteAverage,
  date,
  review,
  closeEditModal,
}: ReviewFormProps) {
  const today = dayjs().format("YYYY.MM.DD");
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(!!review);

  const {
    register,
    reset,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      voteAverage: voteAverage || "",
      date: date || "",
      review: review || "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    try {
      await editReview(formData, id);

      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviewsForSameMovie"] });
      queryClient.invalidateQueries({ queryKey: ["reviewById"] });

      closeEditModal?.();
      router.back();
    } catch (error) {
      alert(`리뷰 수정 중 에러가 발생했습니다.`);
    }
  };

  const handleReset = () => {
    reset();
    closeEditModal?.();
    router.back();
    setIsEditing(false);
  };

  return (
    <form
      action={
        isEditing
          ? onSubmit
          : (formData: FormData) =>
              addReview(formData, movieId, posterPath, title, genres, runtime)
      }
    >
      <div className="relative mb-4 flex items-center gap-4">
        <div className="flex flex-col">
          <Input
            {...register("voteAverage", {
              required: true,
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                handleVoteAverageChange(e, setValue);
              },
            })}
            label="평점"
            type="text"
            inputMode="numeric"
            placeholder="0.0"
            className="h-9 w-20 pl-8"
            icon={
              <Image
                src="/images/blue-star.svg"
                alt="blue-star"
                width={20}
                height={20}
              />
            }
            iconClassName="absolute top-14 left-3 z-10"
          />
        </div>
        <div className="flex flex-col">
          <Input
            {...register("date", { required: true })}
            label="시청 날짜"
            type="text"
            placeholder={today}
            pattern="\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])"
            className="h-9 w-32 p-4"
          />
        </div>
      </div>

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
        className={`mb-3 mt-4 w-full ${!isValid ? "bg-gray600" : "bg-blue"}`}
      >
        {isEditing ? "수정하기" : "등록하기"}
      </Button>
      <Button type="button" onClick={handleReset} className="w-full bg-danger">
        작성 취소하기
      </Button>
    </form>
  );
}
