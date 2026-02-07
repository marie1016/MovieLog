import Image from "next/image";
import { ChangeEvent, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/lib/store/modal";
import { RootState } from "@/lib/store";
import Input from "./input";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  width: string;
  placeholder: string;
}

export default function SearchInput({
  value,
  onChange,
  onKeyDown,
  width,
  placeholder,
}: SearchInputProps) {
  const { isOpen } = useSelector((state: RootState) => state.modal);
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
    </div>
  );
}
