"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ContentCard } from "../components/feed/ContentCard";
import { FeedItem } from "@/types";
import {
  BookmarkIcon as OutlineBookmarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as FilledBookmarkIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { RootState } from "@/store";

export const SortableItem = ({ item }: { item: FeedItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some((fav) => fav.id === item.id)
  );

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(item));
  };

  return (
    <div className="relative">
      {/* Top-right Favorite Button */}
      <button
        className={`absolute z-30 p-1 rounded-md top-2 right-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isFavorite ? "text-red-500" : "text-gray-500 dark:text-gray-300"
        }`}
        onClick={handleFavorite}
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        {isFavorite ? (
          <FilledBookmarkIcon className="w-5 h-5" />
        ) : (
          <OutlineBookmarkIcon className="w-5 h-5" />
        )}
      </button>

      {/* Draggable Card */}
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <ContentCard
          title={item.title}
          id={item.id}
          imageUrl={item.imageUrl}
          description={item.description}
          actionText={item.source === "tmdb" ? "Watch" : "Read More"}
          actionUrl={item.actionUrl}
          source={item.source}
          dragListeners={listeners}
        />
      </div>
    </div>
  );
};
