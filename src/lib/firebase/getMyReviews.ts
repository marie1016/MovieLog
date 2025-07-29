import { Review } from "@/types/addReview";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getMyReviews = async (
  userName: string | null | undefined,
): Promise<Review[]> => {
  const q = query(collection(db, "reviews"), where("userName", "==", userName));

  const documentSnapshots = await getDocs(q);

  const reviewsData = documentSnapshots.docs.map((doc) => {
    const data = doc.data();
    const createdAt = data.createdAt as {
      seconds: number;
      nanoseconds: number;
    };
    return {
      ...data,
      createdAt: new Date(createdAt.seconds * 1000),
    };
  }) as Review[];

  return reviewsData;
};
