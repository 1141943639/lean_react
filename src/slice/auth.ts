import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

interface UserState {
  user: string;
}

const initialState: UserState = {
  user: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;
