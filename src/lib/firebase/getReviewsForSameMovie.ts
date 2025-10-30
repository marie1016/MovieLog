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

export const getReviewsForSameMovie = async (
  title: string | null,
): Promise<Review[]> => {
  try {
    const q = query(
      collection(db, "reviews"),
      where("title", "==", title),
      orderBy("createdAt", "desc"),
    );

    const documentSnapshots = await getDocs(q);

    const reviewsData = documentSnapshots.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: (data.createdAt as Timestamp).toDate(),
      };
    }) as Review[];

    return reviewsData;
  } catch (error) {
    throw new Error("검색한 리뷰 데이터를 불러오는 중 오류가 발생했습니다.");
  }
};
