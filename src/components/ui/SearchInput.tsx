import Image from "next/image";
import { Movie } from "@/types/movie";
import { ChangeEvent, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "@/lib/store/modal";
import useMediaQuery from "@/hooks/useMediaQuery";
import MovieSearchSuggestions from "../addReview/MovieSearchSuggestions";
import Input from "./input";

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
  const isMobile = useMediaQuery("(max-Width:768px)");
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
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
        {isMobile && (
          <button
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            <Image
              src="/images/close-button.svg"
              alt="닫기 버튼"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>

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
