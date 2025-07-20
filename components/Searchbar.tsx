// components/SearchBar.tsx

"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setQuery, setSourceFilter } from "@/store/slices/searchSlice";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);
  const sourceFilter = useSelector(
    (state: RootState) => state.search.sourceFilter
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center px-4 pt-4">
      <input
        type="text"
        placeholder="Search content..."
        className="flex-1 border rounded px-4 py-2 text-sm"
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
      />

      <select
        className="border rounded px-3 py-2 text-sm"
        value={sourceFilter}
        onChange={(e) => dispatch(setSourceFilter(e.target.value as any))}
      >
        <option value="all">🔍 All</option>
        <option value="news">📰 News</option>
        <option value="tmdb">🎬 Movies</option>
      </select>
    </div>
  );
};
