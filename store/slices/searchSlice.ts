// store/slices/searchSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  sourceFilter: "all" | "news" | "tmdb";
}

const initialState: SearchState = {
  query: "",
  sourceFilter: "all",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSourceFilter: (
      state,
      action: PayloadAction<"all" | "news" | "tmdb">
    ) => {
      state.sourceFilter = action.payload;
    },
  },
});

export const { setQuery, setSourceFilter } = searchSlice.actions;
export default searchSlice.reducer;
