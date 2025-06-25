import RankingBox from "@/components/mainPage/RankingBox";
import ReviewFeed from "@/components/mainPage/ReviewFeed";

export default function ReviewsPage() {
  return (
    <div className="flex w-full flex-col-reverse items-start gap-9 md:gap-12 lg:grid lg:grid-cols-[2.5fr_1fr] lg:gap-14">
      <section className="w-full">
        <h1 className="mb-5 w-full text-4xl font-medium md:mb-7">피드</h1>
        <ReviewFeed />
      </section>
      <section className="w-full">
        <h1 className="mb-5 text-4xl font-medium md:mb-7">리뷰 랭킹</h1>
        <RankingBox />
      </section>
    </div>
  );
}
