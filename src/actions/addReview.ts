"use server";

import { User } from "@/lib/store/user";
import { Genre } from "@/types/movie";
import { getFirestore } from "firebase-admin/firestore";

export async function addReview(
  formData: FormData,
  user: User,
  posterPath: string,
  title: string,
  genres: Genre[],
  runtime: number,
) {
  const voteAverage = formData.get("voteAverage");
  const date = formData.get("date");
  const review = formData.get("review");

  const db = getFirestore();
  await db.collection("reviews").add({
    voteAverage,
    date,
    review,
    posterPath,
    title,
    genres,
    runtime,
    createdAt: new Date(),
    userName: user.displayName,
  });
}
