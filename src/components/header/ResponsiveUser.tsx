"use client";

import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import UserMenu from "./UserMenu";

export default function ResponsiveUser() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { user } = useSelector((state: RootState) => state.user);
  if (isMobile === null) return null;

  if (user) return <UserMenu user={user} />;

  if (isMobile) return <Link href="/login">로그인</Link>;
  return (
    <>
      <Link href="/login">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </>
  );
}
