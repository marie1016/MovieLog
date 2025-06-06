"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { saveSearchTerm } from "@/lib/firebase/saveSearchTerm";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";
import Input from "../ui/input";

export default function SearchMovieInput() {
  const router = useRouter();
  const lastChange = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(e.target.value);
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

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`?query=${searchTerm}`);
      await saveSearchTerm(searchTerm);
    }
  };

  return (
    <>
      <Input
        type="text"
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
      {searchResults.length > 0 && (
        <ul className="mt-4 flex h-auto w-[460px] flex-col gap-3 rounded-lg border border-gray bg-white px-7 py-4">
          {searchResults.map((searchResult: Movie) => (
            <li key={searchResult.id} className="flex items-center gap-3">
              <Image
                src="/images/search-icon.svg"
                alt="검색 아이콘"
                width={30}
                height={30}
              />
              <div>{searchResult.title}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
