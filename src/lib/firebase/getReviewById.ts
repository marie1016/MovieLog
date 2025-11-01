import { Review } from "@/types/addReview";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export const getReviewById = async (id: string): Promise<Review | null> => {
  try {
    const docRef = doc(db, "reviews", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return {
      ...data,
      id: docSnap.id,
      createdAt: (data?.createdAt as Timestamp).toDate(),
    } as Review;
  } catch (error) {
    throw new Error("리뷰 상세를 불러오는 중 오류가 발생했습니다.");
  }
};
