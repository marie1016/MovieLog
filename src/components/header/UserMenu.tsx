import { signOut } from "firebase/auth";
import auth from "@/lib/firebase/firebase";
import Link from "next/link";
import { User } from "@/lib/store/user";
import Dropdown from "../ui/dropdown/Dropdown";
import DropdownItem from "../ui/dropdown/DropdownItem";
import DropdownList from "../ui/dropdown/DropdownList";
import DropdownToggle from "../ui/dropdown/DropdownToggle";

export default function UserMenu({ user }: { user: User }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await fetch("/api/logout", {
        method: "POST",
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const { displayName } = user;
  return (
    <Dropdown>
      <DropdownToggle className="cursor-pointer text-blue">
        {displayName}
      </DropdownToggle>
      <DropdownList className="absolute right-0 top-8">
        <DropdownItem>
          <Link href="/myPage">내 기록</Link>
        </DropdownItem>
        <hr className="w-32 border-t border-gray600" />
        <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
