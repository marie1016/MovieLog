import { Review } from "@/types/addReview";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const useRecommendedMovies = (reviewsData: Review[] | undefined) => {
  // 내 최신 리뷰 영화ID 3개 받아오기
  const recentMovieIds =
    reviewsData?.slice(0, 3).map((reviewData) => reviewData.movieId) ?? [];

  return useQuery<Movie[]>({
    queryKey: ["recommendedMovies", recentMovieIds],
    queryFn: () =>
      fetch(
        `/api/recommendedMovies?recentMovieIds=${recentMovieIds.join(",")}`,
      ).then((res) => res.json()),
    enabled: recentMovieIds.length > 0,
    staleTime: 1000 * 60 * 10,
  });
};
