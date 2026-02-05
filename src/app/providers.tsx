"use client";

import { Provider } from "react-redux";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import store from "@/lib/store";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import ModalContainer from "@/components/modals/ModalContainer";
import UserProvider from "../provider/userProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => query.options.meta?.persist === true,
        },
      }}
    >
      <ReactQueryDevtools initialIsOpen />
      <Provider store={store}>
        <UserProvider />
        {children}
        <ModalContainer />
      </Provider>
    </PersistQueryClientProvider>
  );
}
