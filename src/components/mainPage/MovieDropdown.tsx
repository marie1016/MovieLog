"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "../ui/Dropdown/Dropdown";
import DropdownItem from "../ui/Dropdown/DropdownItem";
import DropdownList from "../ui/Dropdown/DropdownList";
import DropdownToggle from "../ui/Dropdown/DropdownToggle";

const SORT_OPTIONS: Record<string, string> = {
  now_playing: "현재 상영 중",
  top_rated: "평점순",
};

type SortKey = keyof typeof SORT_OPTIONS;

export default function MovieDropdown() {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "now_playing";

  const router = useRouter();

  const handleClick = (sortBy: SortKey) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortBy.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Dropdown>
      <DropdownToggle>{SORT_OPTIONS[currentSort]}</DropdownToggle>
      <DropdownList>
        <DropdownItem onClick={() => handleClick("now_playing")}>
          {SORT_OPTIONS.now_playing}
        </DropdownItem>
        <hr className="w-32 border-t border-gray600" />
        <DropdownItem onClick={() => handleClick("top_rated")}>
          {SORT_OPTIONS.top_rated}
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
