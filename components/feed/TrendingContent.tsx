"use client";

import { useEffect, useState } from "react";
import { ContentCard } from "./ContentCard";
import { FeedItem } from "@/types";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY!;

export const TrendingContent = () => {
  const [newsItems, setNewsItems] = useState<FeedItem[]>([]);
  const [tmdbItems, setTmdbItems] = useState<FeedItem[]>([]);
  const [activeTab, setActiveTab] = useState<"news" | "movies">("news");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTrending = async () => {
    setLoading(true);
    try {
      const [newsRes, tmdbRes] = await Promise.all([
        fetch(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${NEWS_API_KEY}`
        ),
        fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
        ),
      ]);

      const newsData = await newsRes.json();
      const tmdbData = await tmdbRes.json();

      const news: FeedItem[] = (newsData.articles || []).map(
        (item: any, index: number) => ({
          id: `news-${index}`,
          source: "news",
          title: item.title,
          imageUrl: item.urlToImage || "",
          description: item.description || "",
          actionUrl: item.url,
        })
      );

      const tmdb: FeedItem[] = (tmdbData.results || []).map((item: any) => ({
        id: `tmdb-${item.id}`,
        source: "tmdb",
        title: item.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        description: item.overview,
        actionUrl: `https://www.themoviedb.org/movie/${item.id}`,
      }));

      setNewsItems(news);
      setTmdbItems(tmdb);
      setError(null);
    } catch (err) {
      console.error("Error fetching trending data:", err);
      setError("Failed to load trending content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrending();
  }, []);

  const renderContent = () => {
    const items = activeTab === "news" ? newsItems : tmdbItems;
    const actionText = activeTab === "news" ? "Read More" : "Watch";

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {items.map((item) => (
          <ContentCard key={item.id} {...item} actionText={actionText} />
        ))}
      </div>
    );
  };

  if (loading)
    return <p className="text-gray-300">Loading trending content...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="mt-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("news")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "news"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          📰 News
        </button>
        <button
          onClick={() => setActiveTab("movies")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "movies"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          🎬 Movies
        </button>
      </div>

      {/* Content */}
      <h2 className="text-xl font-semibold text-[var(--text)]">
        {activeTab === "news" ? "Trending News" : "Trending Movies"}
      </h2>
      {renderContent()}
    </div>
  );
};
