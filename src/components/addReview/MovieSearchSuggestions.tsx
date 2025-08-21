import { Movie } from "@/types/movie";
import Image from "next/image";

interface SearchSuggestionsProps {
  searchResults: Movie[];
  onClick: (title: string) => void;
}

export default function MovieSearchSuggestions({
  searchResults,
  onClick,
}: SearchSuggestionsProps) {
  return (
    <div className="relative">
      <ul className="absolute top-4 flex h-auto w-[460px] flex-col gap-3 rounded-lg border border-gray bg-white px-7 py-4">
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
    </div>
  );
}
