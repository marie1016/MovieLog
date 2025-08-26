import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function useSearchHandlers(decodedQuery: string) {
  const router = useRouter();
  const [value, setValue] = useState(decodedQuery);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowSearchResults(false);
    setValue(e.target.value);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    debouncedValue: string,
  ) => {
    if (e.key === "Enter") {
      router.push(`?query=${debouncedValue}`);
      setShowSearchResults(true);
    }
  };

  const handleClick = (title: string) => {
    setValue(title);
    router.push(`?query=${title}`);
    setShowSearchResults(true);
  };

  return {
    value,
    showSearchResults,
    handleInputChange,
    handleKeyDown,
    handleClick,
  };
}
