import Image from "next/image";
import { Movie } from "@/types/movie";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/lib/store/modal";
import { RootState } from "@/lib/store";
import MovieSearchSuggestions from "../addReview/MovieSearchSuggestions";
import Input from "./input";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClick: (title: string) => void;
  showSearchSuggestions: boolean;
  setShowSearchSuggestions: Dispatch<SetStateAction<boolean>>;
  searchSuggestions: Movie[];
  width: string;
  placeholder: string;
  size?: "sm" | "lg";
  border?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  onKeyDown,
  onClick,
  showSearchSuggestions,
  setShowSearchSuggestions,
  searchSuggestions,
  width,
  placeholder,
  size = "sm",
  border = true,
}: SearchInputProps) {
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          value={value || undefined}
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
        {isOpen && (
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
      {searchSuggestions.length > 0 && showSearchSuggestions && (
        <div ref={ref}>
          <MovieSearchSuggestions
            border={border}
            searchSuggestions={searchSuggestions}
            onClick={onClick}
            size={size}
          />
        </div>
      )}
    </div>
  );
}
