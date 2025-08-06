import { FormStateType } from "@/types/addReview";
import { ChangeEvent } from "react";
import { UseFormSetValue } from "react-hook-form";

export const handleVoteAverageChange = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<FormStateType>,
) => {
  const raw = e.target.value.replace(/\D/g, "");

  const number = parseInt(raw, 10);

  if (Number.isNaN(number) || number < 0 || number > 100) {
    setValue("voteAverage", "");
    return;
  }

  const rating = (number / 10).toFixed(1);

  setValue("voteAverage", rating);
};
