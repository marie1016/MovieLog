import { Genre, GenreResponse } from "@/types/movie";

const genreNames = [
  "코미디",
  "액션",
  "로맨스",
  "스릴러",
  "애니메이션",
  "판타지",
  "드라마",
  "SF",
];

export default async function getGenres() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=ko",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESSTOKEN}`,
        },
        cache: "force-cache",
      },
    );

    if (!res.ok) {
      throw new Error(`장르 목록을 불러오는 데 실패했습니다, ${res.status}`);
    }

    const data = (await res.json()) as GenreResponse;
    const filteredGenres = data.genres.filter((genre: Genre) =>
      genreNames.includes(genre.name),
    );

    return filteredGenres;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
}
