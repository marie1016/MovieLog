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
    path: string,
    debouncedValue: string,
  ) => {
    if (e.key === "Enter") {
      router.push(`${path}?query=${debouncedValue}`);
      setShowSearchResults(true);
    }
  };

  return {
    value,
    setValue,
    showSearchResults,
    setShowSearchResults,
    handleInputChange,
    handleKeyDown,
  };
}
