import { Review } from "@/types/addReview";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export const getReviewById = async (id: string): Promise<Review | null> => {
  const docRef = doc(db, "reviews", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  if (!docSnap.exists()) {
    return null;
  }

  return {
    ...data,
    id: docSnap.id,
    createdAt: (data?.createdAt as Timestamp).toDate(),
  } as Review;
};
