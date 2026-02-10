"use client";

import { useDropdownContext } from "./Dropdown";

export default function DropdownItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { open, toggle } = useDropdownContext();

  const handleClick = () => {
    toggle(!open);
    onClick?.();
  };

  return (
    <li
      onClick={handleClick}
      className="flex h-10 cursor-pointer items-center text-base font-semibold hover:text-blue"
    >
      {children}
    </li>
  );
}
