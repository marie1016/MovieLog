import { Review } from "@/types/addReview";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const getMyReviews = async (
  userName: string | null | undefined,
): Promise<Review[]> => {
  const q = query(
    collection(db, "reviews"),
    where("userName", "==", userName),
    orderBy("createdAt", "desc"),
  );

  const documentSnapshots = await getDocs(q);

  const reviewsData = documentSnapshots.docs.map((doc) => {
    const data = doc.data();

    return {
      ...data,
      id: doc.id,
      createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
    };
  }) as Review[];

  return reviewsData;
};
