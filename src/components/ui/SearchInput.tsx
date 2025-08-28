import Image from "next/image";
import { Movie } from "@/types/movie";
import { ChangeEvent, KeyboardEvent } from "react";
import Input from "./input";
import MovieSearchSuggestions from "../addReview/MovieSearchSuggestions";

interface SearchInputProps {
  value: string;
  searchResults: Movie[];
  showSearchSuggestions: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClick: (title: string) => void;
  width: string;
  placeholder: string;
  size?: "sm" | "lg";
  border?: boolean;
}

export default function SearchInput({
  value,
  searchResults,
  showSearchSuggestions,
  onChange,
  onKeyDown,
  onClick,
  width,
  placeholder,
  size = "sm",
  border = true,
}: SearchInputProps) {
  return (
    <div className="relative">
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
        placeholder={placeholder}
        className={`${width} pl-16 focus:z-0`}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {/* 추천 검색어 */}
      {searchResults.length > 0 && showSearchSuggestions && (
        <MovieSearchSuggestions
          border={border}
          searchResults={searchResults}
          onClick={onClick}
          size={size}
        />
      )}
    </div>
  );
}
