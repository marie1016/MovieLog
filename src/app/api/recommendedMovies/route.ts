import { Movie } from "@/types/movie";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const recentMovieIds = searchParams.get("recentMovieIds");

  if (!recentMovieIds) {
    return NextResponse.json({ error: "recentMovieIds 필요" }, { status: 400 });
  }

  try {
    const fetchRecommendedMovies = async (
      movieId: number,
    ): Promise<Movie[]> => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=ko-KR`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_ACCESSTOKEN}`,
          },
          next: { revalidate: 60 * 60 * 24 },
        },
      );

      if (!res.ok) {
        throw new Error("추천영화를 불러오는 중 오류가 발생했습니다.");
      }

      const data = (await res.json()) as { results: Movie[] };
      return data.results.slice(0, 10);
    };

    // 배열로 만든 후 fetch
    const responses = await Promise.all(
      recentMovieIds.split(",").map((id) => fetchRecommendedMovies(Number(id))),
    );

    // 영화 중복 제거
    const recommendedMovies = Array.from(
      new Map(responses.flat().map((movie) => [movie.id, movie])).values(),
    );

    return NextResponse.json(recommendedMovies);
  } catch (error) {
    return NextResponse.json({ error: "에러 발생" }, { status: 500 });
  }
}
