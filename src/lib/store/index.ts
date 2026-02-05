import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import modalReducer from "./modal";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
