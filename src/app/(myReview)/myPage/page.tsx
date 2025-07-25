import MyCalendar from "@/components/myPage/MyCalendar";
import { getMyReviews } from "@/lib/firebase/getMyReviews";
import { getUser } from "@/lib/firebase/getUser";

export default async function MyPage() {
  const user = await getUser();

  const { reviewsData } = await getMyReviews(user?.displayName);

  return <MyCalendar reviewsData={reviewsData} />;
}
