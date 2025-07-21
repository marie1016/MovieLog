"use client";

import { useDropdownContext } from "./Dropdown";

export default function DropdownList({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const { open } = useDropdownContext();

  return (
    open && (
      <ul
        className={`${className} flex h-20 w-32 flex-col items-center justify-evenly rounded-lg border border-gray600 bg-background-gray400 text-gray600`}
      >
        {children}
      </ul>
    )
  );
}
