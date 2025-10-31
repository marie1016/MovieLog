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
      console.log(res.status);
    }

    const data = (await res.json()) as GenreResponse;
    const filteredGenres = data.genres.filter((genre: Genre) =>
      genreNames.includes(genre.name),
    );

    return filteredGenres;
  } catch (error) {
    console.error("에러 발생:", error);
    return undefined;
  }
}
