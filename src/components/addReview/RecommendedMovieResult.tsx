import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useMyReviews } from "@/hooks/queries/useMyReviews";
import { useRecommendedMovies } from "@/hooks/queries/useRecommendedMovies";
import { Review } from "@/types/addReview";
import SkeletonMovieGrid from "../skeleton/SkeletonMovieGrid";
import MovieGrid from "./MovieGrid";
import RecommendedMovieEmpty from "./RecommendedMovieEmpty";

function RecommendedMovieContent({ reviewsData }: { reviewsData: Review[] }) {
  const {
    data: recommendedMovies,
    isFetching,
    isError,
  } = useRecommendedMovies(reviewsData);

  if (isFetching) return <SkeletonMovieGrid />;

  if (isError)
    return (
      <div className="my-6 rounded-xl bg-white p-8 text-center text-lg">
        추천 영화를 불러오는 중 오류가 발생했습니다.
      </div>
    );

  if (!recommendedMovies) return null;

  return <MovieGrid movies={recommendedMovies} />;
}

export default function RecommendedMovieResult() {
  const { user } = useSelector((state: RootState) => state.user);
  const displayName = user?.displayName || "";

  const { reviewsData, isError, isFetching } = useMyReviews(displayName);

  if (isFetching) return <SkeletonMovieGrid />;
  if (isError)
    return (
      <div className="my-6 rounded-xl bg-white p-8 text-center text-lg">
        추천 영화를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  if (!reviewsData) return null;
  if (!reviewsData.length) return <RecommendedMovieEmpty />;

  return <RecommendedMovieContent reviewsData={reviewsData} />;
}
