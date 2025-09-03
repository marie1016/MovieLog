"use client";

import { useEffect } from "react";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import ResponsiveSearch from "./ResponsiveSearch";
import ResponsiveUser from "./ResponsiveUser";

export default function MainHeader() {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <header className="h-[60px] w-full bg-white shadow-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-10 lg:px-16">
        <Link href="/" className="font-jetBrainsMono text-2xl">
          MovieLog
        </Link>
        {isLoading ? null : (
          <nav className="flex items-center gap-2 text-base font-semibold sm:gap-7">
            <ResponsiveSearch />
            <div className="relative flex gap-7 text-blue">
              <ResponsiveUser />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
