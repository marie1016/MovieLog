import { configureStore } from "@reduxjs/toolkit";
import userReducer, { User } from "./user";
import modalReducer from "./modal";

export function makeStore(initialUser: User | null) {
  return configureStore({
    reducer: {
      user: userReducer,
      modal: modalReducer,
    },
    preloadedState: {
      user: {
        user: initialUser,
        isLoggedIn: !!initialUser,
        isLoading: false,
      },
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
