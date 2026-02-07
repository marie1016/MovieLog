import { useMediaQuery } from "@/hooks/useMediaQuery";
import { openModal } from "@/lib/store/modal";
import Image from "next/image";
import { useDispatch } from "react-redux";
import SearchReviews from "./SearchReviews";

export default function ResponsiveSearch() {
  const isMobile = useMediaQuery("(max-Width:768px)");
  const dispatch = useDispatch();

  if (isMobile === null) return null;
  if (isMobile) {
    return (
      <button
        onClick={() => dispatch(openModal({ modalType: "searchReviews" }))}
      >
        <Image
          src="/images/search-icon.svg"
          alt="검색 아이콘"
          width={40}
          height={40}
        />
      </button>
    );
  }
  return <SearchReviews width="w-72" />;
}
