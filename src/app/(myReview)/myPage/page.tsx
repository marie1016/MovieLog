import MyCalendar from "@/components/myPage/MyCalendar";
import { getMyReviews } from "@/lib/firebase/getMyReviews";
import { getUser } from "@/lib/firebase/getUser";

export default async function MyPage() {
  const user = await getUser();
  const displayName = user?.displayName || "";

  const reviewsData = await getMyReviews(displayName);

  return (
    <>
      <h1 className="mb-6 text-4xl font-medium">
        {user?.displayName}&apos;s 기록
      </h1>
      <div className="mb-16">
        <MyCalendar initialMyReviews={reviewsData} displayName={displayName} />
      </div>
    </>
  );
}
