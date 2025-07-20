import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  selectedCategories: string[];
  darkMode: boolean;
}

const initialState: PreferencesState = {
  selectedCategories: ["technology", "sports"], // default
  darkMode: false,
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.selectedCategories = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
  },
});

export const { setCategories, toggleDarkMode, setDarkMode } =
  preferencesSlice.actions;

export default preferencesSlice.reducer;
