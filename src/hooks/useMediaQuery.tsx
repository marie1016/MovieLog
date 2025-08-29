import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
