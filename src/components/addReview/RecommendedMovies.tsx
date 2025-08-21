import getRecommendedMovies from "@/lib/api/getRecommendedMovies";
import { getMyReviews } from "@/lib/firebase/getMyReviews";
import { getUser } from "@/lib/firebase/getUser";

export default async function RecommendedMovies() {
  const user = await getUser();
  const displayName = user?.displayName || "";

  const reviewsData = await getMyReviews(displayName);

  // 내 최신 리뷰 영화ID 3개 받아오기
  const recentMovieIds = reviewsData
    .slice(0, 3)
    .map((reviewData) => reviewData.movieId);

  const data = await getRecommendedMovies(recentMovieIds);
  console.log(data);
  return <>추천영화</>;
}
