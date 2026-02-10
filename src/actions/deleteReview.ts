"use server";

import { getUser } from "@/lib/firebase/getUser";
import { getFirestore } from "firebase-admin/firestore";

export const deleteReview = async (id?: string) => {
  const user = await getUser();
  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }
  if (!id) {
    throw new Error("삭제할 리뷰 ID가 없습니다.");
  }

  const db = getFirestore();
  const ref = db.collection("reviews").doc(id);
  await ref.delete();
};
