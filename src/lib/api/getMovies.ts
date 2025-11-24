import { MovieResponse } from "@/types/movie";

export default async function getMovies(sortBy: string) {
  try {
    const fetchMovies = async (page: number) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${sortBy}?language=ko-KR&region=KR&page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_ACCESSTOKEN}`,
          },
          next: { revalidate: 60 * 60 * 24 },
        },
      );

      if (!res.ok) {
        throw new Error(
          `영화 목록을 불러오는 중 오류가 발생했습니다, ${res.status}`,
        );
      }

      return res.json() as Promise<MovieResponse>;
    };

    const fetchPromises = [];

    for (let page = 1; page <= 5; page++) {
      fetchPromises.push(fetchMovies(page));
    }
    const results = await Promise.all(fetchPromises);
    const movies = results.flatMap((data) => data.results);

    return movies;
  } catch (error) {
    console.error("에러 발생:", error);
    return undefined;
  }
}
