"use client";

import { motion } from "framer-motion";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";

interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  actionUrl: string;
  source: string;
  onActionClick?: () => void;
  actionText?: string;
  dragListeners?: any; // from dnd-kit
}

export const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  (
    {
      id,
      title,
      imageUrl,
      description,
      actionUrl,
      source,
      onActionClick,
      actionText = "Read More",
      style,
      dragListeners,
      ...rest
    },
    ref
  ) => {
    const { onDrag, onDragEnd, ...cleanedRest } = rest;

    return (
      <motion.div
        ref={ref}
        style={style}
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden transition duration-300 bg-white rounded-lg shadow-md dark:bg-gray-800"
        {...cleanedRest}
      >
        {/* Drag Handle */}
        {dragListeners && (
          <div
            {...dragListeners}
            className="absolute z-20 text-gray-400 top-2 left-2 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <Bars3Icon className="w-5 h-5" />
          </div>
        )}

        {/* Content Image */}
        <img
          src={imageUrl || "null"}
          alt={title}
          className="object-cover w-full h-40"
        />

        {/* Content Body */}
        <div className="p-4 space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
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
  }
);

ContentCard.displayName = "ContentCard";
