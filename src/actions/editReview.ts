"use server";

import { getUser } from "@/lib/firebase/getUser";
import { getFirestore } from "firebase-admin/firestore";

export async function editReview(formData: FormData, id?: string) {
  if (!id) {
    throw new Error("Review ID is required");
  }

  const user = await getUser();
  if (!user) {
    throw new Error("You must be signed in to perform this action");
  }

  const voteAverage = formData.get("voteAverage");
  const date = formData.get("date");
  const review = formData.get("review");

  const db = getFirestore();
  const ref = db.collection("reviews").doc(id);

  await ref.update({
    voteAverage,
    date,
    review,
  });
}
