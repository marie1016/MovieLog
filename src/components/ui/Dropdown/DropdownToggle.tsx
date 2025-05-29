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
      className="border-gray600 text-gray600 flex h-10 w-32 items-center justify-center rounded-lg border bg-white text-base font-semibold"
      onClick={() => toggle(!open)}
    >
      {children}
    </div>
  );
}
