"use client";

import { useDropdownContext } from "./Dropdown";

export default function DropdownToggle({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const { open, toggle } = useDropdownContext();

  return (
    <div className={className} onClick={() => toggle(!open)}>
      {children}
    </div>
  );
}
