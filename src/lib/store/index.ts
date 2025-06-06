import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
