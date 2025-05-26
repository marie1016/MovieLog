import { Genre, GenreResponse } from "@/types/movie";
import { NextResponse } from "next/server";

const genreNames = [
  "코미디",
  "액션",
  "로맨스",
  "다큐멘터리",
  "애니메이션",
  "판타지",
  "드라마",
];

export async function GET() {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=ko",
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
      { error: "장르 목록을 불러오는 데 실패했습니다." },
      { status: res.status },
    );
  }

  const data = (await res.json()) as GenreResponse;

  const filteredGenres = data.genres.filter((genre: Genre) =>
    genreNames.includes(genre.name),
  );

  return NextResponse.json(filteredGenres);
}
