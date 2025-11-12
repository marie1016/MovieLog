"use server";

import { getUser } from "@/lib/firebase/getUser";
import { getFirestore } from "firebase-admin/firestore";

export async function editReview(formData: FormData, id: string) {
  const user = await getUser();
  if (!user) {
    throw new Error("로그인이 필요합니다.");
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
