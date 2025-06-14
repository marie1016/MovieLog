"use server";

import { User } from "@/lib/store/user";
import { getFirestore } from "firebase-admin/firestore";

export async function addReview(formData: FormData, user: User) {
  const voteAverage = formData.get("voteAverage");
  const date = formData.get("date");
  const review = formData.get("review");

  const db = getFirestore();
  await db.collection("reviews").add({
    voteAverage,
    date,
    review,
    createdAt: new Date(),
    userName: user.displayName,
  });
}
