import { FormStateType } from "@/types/addReview";
import { ChangeEvent } from "react";
import { UseFormSetValue } from "react-hook-form";

export const handleVoteAverageChange = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<FormStateType>,
) => {
  // 숫자만 추출
  const raw = e.target.value.replace(/\D/g, "");

  if (raw === "") {
    setValue("voteAverage", "");
    return;
  }

  const number = parseInt(raw, 10);

  if (number >= 0 && number <= 100) {
    const rating = (number / 10).toFixed(1);
    setValue("voteAverage", rating);
  }
};
