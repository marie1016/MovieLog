"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Movie } from "@/types/movie";
import Input from "../ui/input";
import MovieSearchSuggestions from "./MovieSearchSuggestions";
import MovieSearchResults from "./MovieSearchResults";

export default function SearchMovie() {
  const router = useRouter();
  const lastChange = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSearchResults(false);

    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
    }, 500);
  };

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch(`api/searchedMovies?query=${searchTerm}`);
      const data = (await res.json()) as Movie[];
      setSearchResults(data);
    };

    fetchResults();
  }, [searchTerm]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`?query=${searchTerm}`);
      setShowSearchResults(true);
    }
  };

  const handleClick = (title: string) => {
    setSearchTerm(title);
    router.push(`?query=${title}`);
    setShowSearchResults(true);
  };

  return (
    <>
      <Input
        type="text"
        value={searchTerm}
        icon={
          <Image
            src="/images/search-icon.svg"
            alt="검색 아이콘"
            width={40}
            height={40}
          />
        }
        iconClassName="absolute left-4 top-1/2 -translate-y-1/2"
        placeholder="영화 제목"
        className="pl-16 focus:z-0"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {searchResults.length > 0 && !showSearchResults && (
        <MovieSearchSuggestions
          searchResults={searchResults}
          onClick={handleClick}
        />
      )}

      {showSearchResults && (
        <MovieSearchResults searchResults={searchResults} />
      )}
    </>
  );
}
