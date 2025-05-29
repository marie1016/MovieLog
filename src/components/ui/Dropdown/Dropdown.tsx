"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type DropdownContextType = {
  open: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export function useDropdownContext() {
  const ctx = useContext(DropdownContext);

  if (!ctx) {
    throw new Error("Dropdown 컴포넌트 안에서만 사용하세요.");
  }
  return ctx;
}

export default function Dropdown({ children }: { children: React.ReactNode }) {
  const [open, toggle] = useState(false);

  const providerValue = useMemo(() => ({ open, toggle }), [open, toggle]);

  return (
    <DropdownContext.Provider value={providerValue}>
      {children}
    </DropdownContext.Provider>
  );
}
