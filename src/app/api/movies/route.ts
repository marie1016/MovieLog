import { MovieResponse } from "@/types/movie";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&region=KR",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESSTOKEN}`,
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "현재 상영 중인 영화 목록을 불러오는 데 실패했습니다." },
        { status: res.status },
      );
    }

    const data = (await res.json()) as MovieResponse;
    const slicedMovies = data.results.slice(0, 10);

    return NextResponse.json(slicedMovies);
  } catch (error) {
    return NextResponse.json({ error: "에러 발생" }, { status: 500 });
  }
}
