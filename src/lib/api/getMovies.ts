import { MovieResponse } from "@/types/movie";

export default async function getMovies(sortBy: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${sortBy}?language=ko-KR&region=KR`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESSTOKEN}`,
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );

    if (!res.ok)
      throw new Error(`영화 목록을 불러오는 데 실패했습니다, ${res.status}`);

    const data = (await res.json()) as MovieResponse;

    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
}
