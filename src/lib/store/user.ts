import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}
interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
}

const initialUserState: UserState = {
  isLoggedIn: false,
  user: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
