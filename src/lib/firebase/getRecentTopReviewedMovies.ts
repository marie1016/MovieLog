import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export const getRecentTopReviewedMovies = async (): Promise<
  [string, number][] | undefined
> => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const timestamp = Timestamp.fromDate(oneMonthAgo);

    const q = query(
      collection(db, "reviews"),
      where("createdAt", ">=", timestamp),
    );

    const documentSnapshots = await getDocs(q);

    const titleMap = new Map<string, number>();

    documentSnapshots.docs.forEach((doc) => {
      const { title } = doc.data();

      const count = titleMap.get(title as string) ?? 0;
      titleMap.set(title as string, count + 1);
    });

    const sortedTitleMap = Array.from(titleMap.entries()).sort((a, b) => {
      // 내림차순(count순)
      if (a[1] !== b[1]) return b[1] - a[1];

      // 오름차순(가나다순)
      return a[0].localeCompare(b[0], "ko");
    });

    return sortedTitleMap;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
