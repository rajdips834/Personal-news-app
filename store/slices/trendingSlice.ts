// store/slices/trendingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTrendingItems = createAsyncThunk(
  "trending/fetchTrendingItems",
  async () => {
    const [news, movies, posts] = await Promise.all([
      axios.get("/api/trending/news"),
      axios.get("/api/trending/movies"),
      axios.get("/api/trending/posts"),
    ]);
    return {
      news: news.data,
      movies: movies.data,
      posts: posts.data,
    };
  }
);

interface TrendingState {
  news: any[];
  movies: any[];
  posts: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
}

const initialState: TrendingState = {
  news: [],
  movies: [],
  posts: [],
  status: "idle",
  error: "",
};

const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrendingItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload.news;
        state.movies = action.payload.movies;
        state.posts = action.payload.posts;
      })
      .addCase(fetchTrendingItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default trendingSlice.reducer;
