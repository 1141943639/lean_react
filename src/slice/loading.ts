import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

interface LoadingState {
  loading: boolean;
  loadingCount: number;
}

const initialState: LoadingState = {
  loading: false,
  loadingCount: 0,
};

export const languageSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    changeLoading(state, action: PayloadAction<boolean>) {
      let newValue = action.payload
        ? state.loadingCount + 1
        : state.loadingCount - 1;

      if (newValue < 0) newValue = 0;

      state.loadingCount = newValue;
      state.loading = Boolean(newValue);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLoading } = languageSlice.actions;

export default languageSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectLoading = (state: RootState) => state.loading;
