import { Movie } from "@/types/movie";
import clsx from "clsx";
import Image from "next/image";

interface SearchSuggestionsProps {
  searchResults: Movie[];
  onClick: (title: string) => void;
  size: string | undefined;
}

export default function MovieSearchSuggestions({
  searchResults,
  onClick,
  size,
}: SearchSuggestionsProps) {
  const width = size === "lg" ? "sm:w-[460px]" : "";

  return (
    <ul
      className={clsx(
        width,
        "absolute top-16 z-10 flex h-auto w-72 flex-col gap-3 rounded-lg border border-gray bg-white px-7 py-4",
      )}
    >
      {searchResults.map((searchResult: Movie) => (
        <li key={searchResult.id} className="flex items-center gap-3">
          <Image
            src="/images/search-icon.svg"
            alt="검색 아이콘"
            width={30}
            height={30}
          />
          <button onClick={() => onClick(searchResult.title)}>
            {searchResult.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
