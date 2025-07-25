export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  poster_path: string;
  genres: Genre[];
  runtime: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
}
