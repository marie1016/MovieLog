import MyCalendar from "@/components/myPage/MyCalendar";
import { getMyReviews } from "@/lib/firebase/getMyReviews";
import { getUser } from "@/lib/firebase/getUser";

export default async function MyPage() {
  const user = await getUser();

  const { reviewsData } = await getMyReviews(user?.displayName);

  return (
    <>
      <h1 className="mb-6 text-4xl font-medium">
        {user?.displayName}&apos;s 기록
      </h1>
      <MyCalendar reviewsData={reviewsData} />
    </>
  );
}
