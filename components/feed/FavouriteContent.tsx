"use client";

import { ContentCard } from "@/components/feed/ContentCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const FavoriteContent = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const query = useSelector((state: RootState) => state.search.query);

  const filteredFavorites = favorites.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredFavorites.length === 0) {
    return <p className="text-center text-gray-500">No favorites found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredFavorites.map((item) => (
        <ContentCard key={item.id} {...item} />
      ))}
    </div>
  );
};
