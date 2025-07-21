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
} from "@dnd-kit/sortable";
import { useState, useEffect, useRef } from "react";
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
  const loaderRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          dispatch(incrementPage());
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading, dispatch]);

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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <SortableItem key={index} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Infinite Scroll Sentinel */}
      <div ref={loaderRef} className="h-10" />

      {loading && (
        <div className="py-4 text-center text-gray-500 col-span-full">
          Loading more...
        </div>
      )}

      {debouncedQuery && feed.length === 0 && !loading && (
        <div className="py-4 text-center text-gray-400 col-span-full">
          No results found.
        </div>
      )}
    </>
  );
};
