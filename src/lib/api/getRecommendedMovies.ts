import { Movie } from "@/types/movie";

export default async function getRecommendedMovies(recentMovieIds: number[]) {
  try {
    const responses = await Promise.all(
      recentMovieIds.map(async (movieId) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=ko-KR`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.TMDB_ACCESSTOKEN}`,
            },
            next: { revalidate: 60 * 10 },
          },
        );

        if (!res.ok) {
          console.log(res.status);
        }

        const data = (await res.json()) as { results: Movie[] };
        return data.results.slice(0, 10);
      }),
    );

    // 영화 중복 제거
    const recommendedMovies = Array.from(
      new Map(responses.flat().map((movie) => [movie.id, movie])).values(),
    );

    return recommendedMovies;
  } catch (error) {
    console.error("에러 발생:", error);
    return undefined;
  }
}
