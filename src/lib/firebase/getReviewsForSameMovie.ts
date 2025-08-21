import { Review } from "@/types/addReview";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getReviewsForSameMovie = async (
  title: string,
): Promise<Review[]> => {
  const q = query(
    collection(db, "reviews"),
    where("title", "==", title),
    orderBy("createdAt", "desc"),
  );

  const documentSnapshots = await getDocs(q);

  const reviewsData = documentSnapshots.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];

  return reviewsData;
};
