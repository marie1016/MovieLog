import RankingBox from "@/components/mainPage/RankingBox";
import ReviewFeed from "@/components/mainPage/ReviewFeed";

export default function ReviewsPage() {
  return (
    <div className="flex w-full flex-col-reverse items-start gap-9 lg:flex-row lg:gap-12">
      <section className="lg:w-3/4">
        <h1 className="mb-5 w-full text-2xl font-medium md:mb-7">피드</h1>
        <ReviewFeed />
      </section>
      <section className="lg:w-1/4">
        <h1 className="mb-5 text-2xl font-medium md:mb-7">리뷰 랭킹</h1>
        <RankingBox />
      </section>
    </div>
  );
}
