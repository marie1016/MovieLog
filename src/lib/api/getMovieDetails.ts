import { Movie } from "@/types/movie";

export default async function getMovieDetails(id: number) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESSTOKEN}`,
        },
        cache: "force-cache",
      },
    );

    if (!res.ok) {
      throw new Error(`영화 정보를 불러오는 데 실패했습니다, ${res.status}`);
    }

    const data = (await res.json()) as Movie;
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    return undefined;
  }
}
