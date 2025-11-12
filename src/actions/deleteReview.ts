"use server";

import { getFirestore } from "firebase-admin/firestore";

export const deleteReview = async (id?: string) => {
  if (!id) {
    throw new Error("삭제할 리뷰 ID가 없습니다.");
  }

  const db = getFirestore();
  const ref = db.collection("reviews").doc(id);
  await ref.delete();
};
