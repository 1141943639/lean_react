import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { User } from "interface/user";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    name: "",
    username: "",
    id: undefined,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth;
