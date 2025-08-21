import { Genre } from "./movie";

export interface FormStateType {
  voteAverage: string;
  date: string;
  review: string;
}

export interface Review {
  id: string;
  voteAverage: string;
  date: string;
  review: string;
  createdAt: Date;
  userName: string;
  movieId: number;
  posterPath: string;
  title: string;
  genres: Genre[];
  runtime: number;
}
