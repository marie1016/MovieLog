import { Genre } from "@/types/movie";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
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
}

export const getReviewsForSameMovie = async (
  title: string,
): Promise<ReviewPage> => {
  const q = query(
    collection(db, "reviews"),
    orderBy("createdAt", "desc"),
    where("title", "==", title),
  );

  const documentSnapshots = await getDocs(q);

  const reviewsData = documentSnapshots.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];

  return { reviewsData };
};
