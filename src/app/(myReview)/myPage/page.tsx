import MyCalendar from "@/components/myPage/MyCalendar";
import { getMyReviews } from "@/lib/firebase/getMyReviews";
import { getUser } from "@/lib/firebase/getUser";

export default async function MyPage() {
  const user = await getUser();
  const displayName = user?.displayName || "";

  const reviewsData = await getMyReviews(displayName);

  if (!reviewsData) {
    throw new Error("내 리뷰 데이터를 불러오는 중 오류가 발생했습니다.");
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-medium">
        {user?.displayName}&apos;s 기록
      </h1>
      <div className="mb-16">
        <MyCalendar initialMyReviews={reviewsData} displayName={displayName} />
      </div>
    </div>
  );
}
