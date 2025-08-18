import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const deleteReview = async (id: string) => {
  if (!id) throw new Error("삭제할 리뷰 ID가 없습니다.");

  await deleteDoc(doc(db, "reviews", id));
};
