import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectLanguage = (state: RootState) => state.language;
