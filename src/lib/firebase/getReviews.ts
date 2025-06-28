import { Genre } from "@/types/movie";
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

interface Review {
  id: string;
  voteAverage: string;
  date: string;
  review: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  userName: string;
  posterPath: string;
  title: string;
  genres: Genre[];
  runtime: number;
}

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

  const reviewsData = documentSnapshots.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];

  return { reviewsData, nextCursor: lastVisible };
};
