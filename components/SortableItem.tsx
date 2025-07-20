// components/SortableItem.tsx
"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ContentCard } from "../components/feed/ContentCard";
import { FeedItem } from "@/types";

export const SortableItem = ({ item }: { item: FeedItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ContentCard
        title={item.title}
        id={item.id}
        imageUrl={item.imageUrl}
        description={item.description}
        actionText={item.source === "tmdb" ? "Watch" : "Read More"}
        actionUrl={item.actionUrl}
        source={item.source}
      />
    </div>
  );
};
