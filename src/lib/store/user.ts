import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}
interface UserState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialUserState: UserState = {
  isLoggedIn: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = true;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
