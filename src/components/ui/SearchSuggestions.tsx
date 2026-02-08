import { Movie } from "@/types/movie";
import clsx from "clsx";
import Image from "next/image";

interface SearchSuggestionsProps {
  searchSuggestions: Movie[] | undefined;
  onClick: (title: string) => void;
  size: string | undefined;
  border: boolean | undefined;
}

export default function SearchSuggestions({
  border,
  searchSuggestions,
  onClick,
  size,
}: SearchSuggestionsProps) {
  const width = size === "lg" ? "sm:w-[460px]" : "";
  const isBorder = border && "border border-gray";

  return (
    <ul
      className={clsx(
        width,
        isBorder,
        "flex h-auto w-72 flex-col gap-3 rounded-lg bg-white px-7 py-4",
      )}
    >
      {searchSuggestions?.map((searchSuggestion: Movie) => (
        <li
          key={searchSuggestion.id}
          className="flex items-center gap-3 hover:bg-gray100"
        >
          <Image
            src="/images/search-icon.svg"
            alt="검색 아이콘"
            width={30}
            height={30}
          />
          <button
            onClick={() => onClick(searchSuggestion.title)}
            className="truncate font-normal"
          >
            {searchSuggestion.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
