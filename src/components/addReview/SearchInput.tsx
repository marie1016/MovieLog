import Image from "next/image";
import { Movie } from "@/types/movie";
import { ChangeEvent, KeyboardEvent } from "react";
import Input from "../ui/input";
import MovieSearchSuggestions from "./MovieSearchSuggestions";

interface SearchInputProps {
  value: string;
  searchResults: Movie[];
  showSearchResults: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClick: (title: string) => void;
}

export default function SearchInput({
  value,
  searchResults,
  showSearchResults,
  onChange,
  onKeyDown,
  onClick,
}: SearchInputProps) {
  return (
    <>
      <Input
        type="text"
        value={value}
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
        className="w-72 pl-16 focus:z-0 sm:w-[460px]"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {/* 추천 검색어 */}
      {searchResults.length > 0 && !showSearchResults && (
        <MovieSearchSuggestions
          searchResults={searchResults}
          onClick={onClick}
        />
      )}
    </>
  );
}
