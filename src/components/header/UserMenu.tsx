import { signOut } from "firebase/auth";
import auth from "@/lib/firebase/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/lib/store/user";
import { useQueryClient } from "@tanstack/react-query";
import Dropdown from "../ui/dropdown/Dropdown";
import DropdownItem from "../ui/dropdown/DropdownItem";
import DropdownList from "../ui/dropdown/DropdownList";
import DropdownToggle from "../ui/dropdown/DropdownToggle";

export default function UserMenu({ user }: { user: User }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await fetch("/api/logout", {
        method: "POST",
      });
      queryClient.clear();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dropdown>
      <DropdownToggle className="cursor-pointer text-blue">
        {user.displayName}
      </DropdownToggle>
      <DropdownList className="absolute right-2 top-10 z-10">
        <DropdownItem>
          <Link href="/myPage">내 기록</Link>
        </DropdownItem>
        <hr className="w-32 border-t border-gray600" />
        <DropdownItem>
          <Link href="/addReview">리뷰 작성</Link>
        </DropdownItem>
        <hr className="w-32 border-t border-gray600" />
        <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
