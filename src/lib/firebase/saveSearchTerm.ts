import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const saveSearchedMovies = async (searchTerm: string) => {
  await setDoc(doc(db, "searchTerms", searchTerm), {
    searchTerm,
    createdAt: serverTimestamp(),
  });
};
