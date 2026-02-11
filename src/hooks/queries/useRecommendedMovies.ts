import { Review } from "@/types/addReview";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const useRecommendedMovies = (reviewsData: Review[] | undefined) => {
  // 내 최신 리뷰 영화ID 3개 받아오기
  const recentMovieIds = reviewsData
    ?.slice(0, 3)
    .map((reviewData) => reviewData.movieId)
    .join(",");

  return useQuery<Movie[]>({
    queryKey: ["recommendedMovies", recentMovieIds],
    queryFn: async () => {
      const res = await fetch(
        `/api/recommendedMovies?recentMovieIds=${recentMovieIds}`,
      );

      if (!res.ok) {
        throw new Error("추천 영화를 불러오는 중 오류가 발생했습니다.");
      }

      return res.json();
    },
    enabled: !!reviewsData?.length,
    staleTime: 1000 * 60 * 5,
  });
};
