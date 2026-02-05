"use client";

import { useEffect } from "react";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import ResponsiveSearch from "./ResponsiveSearch";
import ResponsiveUser from "./ResponsiveUser";
import AuthHeader from "./AuthHeader";

export default function MainHeader() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <AuthHeader>
      {!isLoggedIn ? null : (
        <nav className="flex items-center gap-2 text-base font-semibold sm:gap-7">
          <ResponsiveSearch />
          <div className="relative flex gap-7 text-blue">
            <ResponsiveUser />
          </div>
        </nav>
      )}
    </AuthHeader>
  );
}
