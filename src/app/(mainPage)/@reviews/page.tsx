import RankingBox from "@/components/mainPage/RankingBox";
import SkeletonRankingBox from "@/components/skeleton/SkeletonRankingBox";
import { getReviews } from "@/lib/firebase/getReviews";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ReviewFeed = dynamic(() => import("@/components/mainPage/ReviewFeed"), {
  ssr: false,
});

export default async function ReviewsPage() {
  const initialPage = await getReviews(null);

  return (
    <div className="flex w-full flex-col-reverse items-start gap-9 lg:flex-row lg:gap-12">
      <section className="w-full lg:w-3/4">
        <h1 className="mb-5 w-full text-2xl font-medium md:mb-7">피드</h1>
        <ReviewFeed initialPage={initialPage} />
      </section>
      <section className="lg:w-1/4">
        <h1 className="mb-5 text-2xl font-medium md:mb-7">리뷰 랭킹</h1>
        <Suspense fallback={<SkeletonRankingBox />}>
          <RankingBox />
        </Suspense>
      </section>
    </div>
  );
}
