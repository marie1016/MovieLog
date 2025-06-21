import { Genre } from "@/types/movie";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

interface Review {
  id: string;
  voteAverage: string;
  date: string;
  review: string;
  createdAt: Date;
  userName: string;
  posterPath: string;
  title: string;
  genres: Genre[];
  runtime: number;
}

export const getReviews = async () => {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const reviewsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];

  return reviewsData;
};
