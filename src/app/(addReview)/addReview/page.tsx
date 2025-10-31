import SearchMovies from "@/components/addReview/SearchMovies";
import getRecommendedMovies from "@/lib/api/getRecommendedMovies";
import { getMyReviews } from "@/lib/firebase/getMyReviews";
import { getUser } from "@/lib/firebase/getUser";

export default async function AddReviewPage() {
  const user = await getUser();
  const displayName = user?.displayName || "";

  const reviewsData = await getMyReviews(displayName);

  // 내 최신 리뷰 영화ID 3개 받아오기
  const recentMovieIds = reviewsData
    .slice(0, 3)
    .map((reviewData) => reviewData.movieId);

  const recommendedMovies = await getRecommendedMovies(recentMovieIds);

  return (
    <main>
      <h1 className="mb-6 text-2xl font-medium">영화 검색</h1>
      <SearchMovies recommendedMovies={recommendedMovies} />
    </main>
  );
}
