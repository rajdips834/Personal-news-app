"use client";

import { motion } from "framer-motion";
import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as FilledBookmarkIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/slices/favoritesSlice";
import { RootState } from "@/store";

interface ContentCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  actionUrl: string;
  source: string;
  onActionClick?: () => void;
  actionText?: string;
}

export const ContentCard = ({
  id,
  title,
  imageUrl,
  description,
  actionUrl,
  source,
  onActionClick,
  actionText = "Read More",
}: ContentCardProps) => {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some((item) => item.id === id)
  );

  const handleFavorite = () => {
    dispatch(
      toggleFavorite({
        id,
        title,
        imageUrl,
        description,
        actionUrl,
        source,
      })
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300"
    >
      <img
        src={imageUrl || "null"}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={handleFavorite}
            className={`hover:text-red-500 ${
              isFavorite ? "text-red-500" : "text-gray-500 dark:text-gray-300"
            }`}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isFavorite ? (
              <FilledBookmarkIcon className="h-5 w-5" />
            ) : (
              <OutlineBookmarkIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {description}
        </p>
        {onActionClick && (
          <button
            onClick={onActionClick}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {actionText}
          </button>
        )}
      </div>
    </motion.div>
  );
};
