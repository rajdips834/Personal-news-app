// components/FeedContent.tsx
"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchFilteredFeedThunk,
  incrementPage,
} from "@/store/slices/feedSlice";
import { useDebounce } from "@/hooks/useDebounce";
import { ContentCard } from "./ContentCard";
import { SearchBar } from "../Searchbar";
import { FeedItem } from "@/types";
import { SortableItem } from "../SortableItem";

export const FeedContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { feed, hasMore, page, loading } = useSelector(
    (state: RootState) => state.feed
  );
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const sourceFilter = useSelector(
    (state: RootState) => state.search.sourceFilter
  );

  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    setItems(feed);
  }, [feed]);

  useEffect(() => {
    dispatch(
      fetchFilteredFeedThunk({
        page,
        query: debouncedQuery,
        source: sourceFilter,
      }) as any
    );
  }, [page, debouncedQuery, sourceFilter, dispatch]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <>
      <SearchBar />
      <div className="mb-4" />
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {loading && (
        <div className="col-span-full text-center py-4 text-gray-500">
          Loading more...
        </div>
      )}

      {debouncedQuery && feed.length === 0 && !loading && (
        <div className="col-span-full text-center py-4 text-gray-400">
          No results found.
        </div>
      )}
    </>
  );
};
