"use server";

import { getFirestore } from "firebase-admin/firestore";

export const deleteReview = async (id: string) => {
  const db = getFirestore();
  const ref = db.collection("reviews").doc(id);
  await ref.delete();
};
