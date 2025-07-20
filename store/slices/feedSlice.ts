// slices/feedSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchFilteredFeed } from "@/util/fetchContent";
import { FeedItem } from "@/types";

interface FeedState {
  feed: FeedItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  lastQuery: string;
}

const initialState: FeedState = {
  feed: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1,

  lastQuery: "",
};

export const fetchFilteredFeedThunk = createAsyncThunk(
  "feed/fetchFilteredFeed",
  async (
    { query, source, page }: { query: string; source: string; page: number },
    { getState }
  ) => {
    const data = await fetchFilteredFeed(query, source, page);
    return { data, query, page };
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    clearFeed(state) {
      state.feed = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredFeedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredFeedThunk.fulfilled, (state, action) => {
        const { data, query, page } = action.payload;

        // if query changed, reset feed
        if (query !== state.lastQuery || page === 1) {
          state.feed = data;
        } else {
          state.feed = [...state.feed, ...data];
        }

        state.lastQuery = query;
        state.hasMore = data.length > 0;
        state.loading = false;
      })
      .addCase(fetchFilteredFeedThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch feed.";
      });
  },
});

export const { incrementPage, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
