"use server";

import { db } from "@/lib/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

export async function addReview(formData: FormData) {
  const voteAverage = formData.get("voteAverage");
  const date = formData.get("date");
  const review = formData.get("review");

  await addDoc(collection(db, "reviews"), {
    voteAverage,
    date,
    review,
    createdAt: Date.now(),
  });
}
