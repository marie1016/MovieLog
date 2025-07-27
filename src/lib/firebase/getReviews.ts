import { Review } from "@/types/addReview";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

export interface ReviewPage {
  reviewsData: Review[];
  nextCursor: QueryDocumentSnapshot<DocumentData> | null;
}

export const getReviews = async (
  pageParam?: QueryDocumentSnapshot<DocumentData> | null,
): Promise<ReviewPage> => {
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
      : documentSnapshots.docs[documentSnapshots.docs.length - 1];

  const reviewsData = documentSnapshots.docs.map((doc) => {
    const data = doc.data();
    const createdAt = data.createdAt as {
      seconds: number;
      nanoseconds: number;
    };
    return {
      ...data,
      id: doc.id,
      createdAt: new Date(createdAt.seconds * 1000),
    };
  }) as Review[];

  return { reviewsData, nextCursor: lastVisible };
};
