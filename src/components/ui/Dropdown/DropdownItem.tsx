"use client";

import { useDropdownContext } from "./Dropdown";

export default function DropdownItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const { open, toggle } = useDropdownContext();

  const handleClick = () => {
    toggle(!open);
    onClick();
  };

  return (
    <li
      onClick={handleClick}
      className="cursor-pointer text-base font-semibold"
    >
      {children}
    </li>
  );
}
