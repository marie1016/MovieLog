import Image from "next/image";
import Dropdown from "./Dropdown/Dropdown";
import DropdownToggle from "./Dropdown/DropdownToggle";
import DropdownList from "./Dropdown/DropdownList";
import DropdownItem from "./Dropdown/DropdownItem";

export default function ReviewDropdown() {
  return (
    <div className="relative">
      <Dropdown>
        <DropdownToggle className="cursor-pointer">
          <div className="relative h-[17.33px] w-1">
            <Image src="/images/kebab.svg" alt="케밥 버튼" fill />
          </div>
        </DropdownToggle>
        <DropdownList className="absolute right-0 top-6 z-20 bg-white">
          <DropdownItem>수정하기</DropdownItem>
          <hr className="w-32 border-t border-gray600" />
          <DropdownItem>삭제하기</DropdownItem>
        </DropdownList>
      </Dropdown>
    </div>
  );
}
