"use client";

import { Provider } from "react-redux";
import store from "@/lib/store";
import { login, User } from "@/lib/store/user";
import { useEffect } from "react";

export default function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  useEffect(() => {
    if (initialUser) {
      store.dispatch(login(initialUser));
    }
  }, [initialUser]);

  return <Provider store={store}>{children}</Provider>;
}
