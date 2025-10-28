import { MovieResponse } from "@/types/movie";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko-KR&region=KR`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESSTOKEN}`,
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "검색한 영화를 불러오는 데 실패했습니다." },
        {
          status: res.status,
        },
      );
    }

    const data = (await res.json()) as MovieResponse;
    const searchedMovies = data.results.slice(0, 10);

    return NextResponse.json(searchedMovies);
  } catch (error) {
    return NextResponse.json({ error: "에러 발생" }, { status: 500 });
  }
}
