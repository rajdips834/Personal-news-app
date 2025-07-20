// store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import favoritesReducer from "./slices/favoritesSlice";
import searchReducer from "./slices/searchSlice";
import feedReducer from "./slices/feedSlice";
import trendingReducer from "./slices/trendingSlice";
// Combine all reducers
const rootReducer = combineReducers({
  favorites: favoritesReducer,
  search: searchReducer,
  feed: feedReducer,
  trending: trendingReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites", "search", "feed"], // ⬅️ Add slices you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Export persistor
export const persistor = persistStore(store);

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
