"use client";

import { Provider, useDispatch } from "react-redux";
import store from "@/lib/store";
import { login, logout, User } from "@/lib/store/user";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function DispatchUser({ initialUser }: { initialUser: User | null }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialUser) {
      dispatch(login(initialUser));
    } else {
      dispatch(logout());
    }
  }, [initialUser, dispatch]);

  return null;
}

export default function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <DispatchUser initialUser={initialUser} />
        {children}
      </Provider>
    </QueryClientProvider>
  );
}
