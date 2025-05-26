export type Genre = {
  id: number;
  name: string;
};

export type GenreResponse = {
  genres: Genre[];
};

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  poster_path: string;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
};
