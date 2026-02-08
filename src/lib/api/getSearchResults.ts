export const getSearchResults = (value: string) =>
  fetch(`/api/searchMovies?query=${value}`).then((res) => res.json());
