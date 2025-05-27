import Dropdown from "../ui/Dropdown/Dropdown";
import DropdownItem from "../ui/Dropdown/DropdownItem";
import DropdownList from "../ui/Dropdown/DropdownList";
import DropdownToggle from "../ui/Dropdown/DropdownToggle";

export default function MovieDropdown() {
  return (
    <Dropdown>
      <DropdownToggle>현재 상영 중</DropdownToggle>
      <DropdownList>
        <DropdownItem>현재 상영 중</DropdownItem>
        <hr className="border-gray600 w-32 border" />
        <DropdownItem>인기순</DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
