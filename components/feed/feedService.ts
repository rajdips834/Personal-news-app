// services/feedService.ts
import { FeedItem } from "@/types";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

// Fetch TMDB trending movies
export const fetchTMDBData = async (page: number): Promise<FeedItem[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}&page=${page}`
  );
  const data = await res.json();

  return (data.results || []).map((item: any) => ({
    id: `tmdb-${item.id}`,
    source: "tmdb",
    title: item.title,
    imageUrl: item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : "",
    description: item.overview,
    actionUrl: `https://www.themoviedb.org/movie/${item.id}`,
  }));
};

// Fetch News top headlines OR search-based news
export const fetchNewsData = async (
  page: number,
  query?: string
): Promise<FeedItem[]> => {
  const baseUrl = query
    ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&pageSize=5&page=${page}&apiKey=${NEWS_API_KEY}`
    : `https://newsapi.org/v2/top-headlines?category=technology&country=us&pageSize=5&page=${page}&apiKey=${NEWS_API_KEY}`;

  const res = await fetch(baseUrl);
  const data = await res.json();

  return (data.articles || []).map((item: any, index: number) => ({
    id: `news-${page}-${index}`,
    source: "news",
    title: item.title,
    imageUrl: item.urlToImage || "",
    description: item.description || "",
    actionUrl: item.url,
  }));
};

// Fetch combined feed
export const fetchCombinedFeed = async (
  page: number,
  query?: string,
  source: "all" | "news" | "tmdb" = "all"
): Promise<FeedItem[]> => {
  const promises: Promise<FeedItem[]>[] = [];

  if (source === "all" || source === "news") {
    promises.push(fetchNewsData(page, query));
  }

  if (source === "all" || source === "tmdb") {
    promises.push(fetchTMDBData(page));
  }

  const results = await Promise.all(promises);
  return results.flat();
};
