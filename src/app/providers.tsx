"use client";

import { Provider, useDispatch } from "react-redux";
import store from "@/lib/store";
import { login, logout, User } from "@/lib/store/user";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient();

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
  useEffect(() => {
    const localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <Provider store={store}>
        <DispatchUser initialUser={initialUser} />
        {children}
      </Provider>
    </QueryClientProvider>
  );
}
