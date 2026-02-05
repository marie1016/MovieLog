export const getSearchResults = (value: string) =>
  fetch(`/api/searchMovies?query=${encodeURIComponent(value)}`).then((res) =>
    res.json(),
  );
