import { Movie } from "@/types/movie";

export async function getSearchedMovies(query: string) {
  const res = await fetch(`/api/searchedMovies?query=${query}`);
  if (!res.ok) {
    const data = (await res.json()) as { error: string };
    throw new Error(data.error);
  }
  const data = (await res.json()) as Movie[];
  return data;
}
