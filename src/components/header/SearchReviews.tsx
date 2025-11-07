"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSearchHandlers from "@/hooks/useSearchHandler";
import useSearchMovies from "@/hooks/useSearchMovies";
import SearchInput from "../ui/SearchInput";

export default function SearchReviews({
  width,
  border,
}: {
  width: string;
  border?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const { value, handleKeyDown, handleClick } = useSearchHandlers(query!);

  const { debouncedValue } = useSearchMovies(value, 500);

  const handleReviewClick = (title: string) => {
    handleClick(title);
    router.push(`/searchReviews?query=${title}`);
  };

  return (
    <SearchInput
      onKeyDown={(e) => handleKeyDown(e, "searchReviews", debouncedValue)}
      onClick={handleReviewClick}
      width={width}
      placeholder="리뷰검색"
      border={border}
    />
  );
}
