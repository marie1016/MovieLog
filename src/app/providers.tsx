"use client";

import { Provider } from "react-redux";
import { User } from "@/lib/store/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { makeStore } from "@/lib/store";
import UserDispatch from "@/components/auth/UserDispatch";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useEffect } from "react";

const queryClient = new QueryClient();

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

  const store = makeStore(initialUser);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <Provider store={store}>
        <UserDispatch />
        {children}
      </Provider>
    </QueryClientProvider>
  );
}
