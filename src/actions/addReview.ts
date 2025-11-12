"use server";

import { getUser } from "@/lib/firebase/getUser";
import { Genre } from "@/types/movie";
import { getFirestore } from "firebase-admin/firestore";
import { redirect } from "next/navigation";

export async function addReview(
  formData: FormData,
  movieId: number | undefined,
  posterPath: string,
  title: string,
  genres: Genre[],
  runtime: number,
) {
  const user = await getUser();
  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const voteAverage = formData.get("voteAverage");
  const date = formData.get("date");
  const review = formData.get("review");

  const db = getFirestore();
  await db.collection("reviews").add({
    voteAverage,
    date,
    review,
    movieId,
    posterPath,
    title,
    genres,
    runtime,
    createdAt: new Date(),
    userName: user.displayName,
  });
  redirect("/");
}
