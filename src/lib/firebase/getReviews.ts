import { Review } from "@/types/addReview";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface ReviewPage {
  reviewsData: Review[];
  nextCursor: Date | null;
}

export const getReviews = async (
  pageParam?: Date | null,
): Promise<ReviewPage> => {
  try {
    const first = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc"),
      limit(8),
    );

    const next = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc"),
      startAfter(pageParam),
      limit(8),
    );

    const documentSnapshots = await getDocs(pageParam ? next : first);

    const lastVisible =
      documentSnapshots.docs.length < 8
        ? null
        : (
            documentSnapshots.docs[documentSnapshots.docs.length - 1].data()
              .createdAt as Timestamp
          ).toDate();

    const reviewsData = documentSnapshots.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
      };
    }) as Review[];

    return { reviewsData, nextCursor: lastVisible };
  } catch (error) {
    throw new Error("리뷰 피드를 불러오는 중 오류가 발생했습니다.");
  }
};
