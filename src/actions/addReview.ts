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
    throw new Error("You must be signed in to perform this action");
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
