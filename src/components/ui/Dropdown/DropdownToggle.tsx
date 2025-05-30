"use client";

import { useDropdownContext } from "./Dropdown";

export default function DropdownToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, toggle } = useDropdownContext();

  return (
    <div
      className="flex h-10 w-32 cursor-pointer items-center justify-center rounded-lg border border-gray600 bg-white text-base font-semibold text-gray600"
      onClick={() => toggle(!open)}
    >
      {children}
    </div>
  );
}
