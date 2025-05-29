"use client";

export default function DropdownItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <li onClick={onClick} className="cursor-pointer text-base font-semibold">
      {children}
    </li>
  );
}
