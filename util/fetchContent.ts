import { FeedItem } from "@/types";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY!;

export async function fetchFilteredFeed(
  query: string,
  source: string,
  page = 1
): Promise<FeedItem[]> {
  console.log(
    "Fetching feed with query:",
    query,
    "source:",
    source,
    "page:",
    page
  );
  const results: FeedItem[] = [];

  const fetchNews = async (): Promise<FeedItem[]> => {
    const defaultQuery = "latest";
    const searchQuery = query || defaultQuery;
    const newsQuery = `q=${encodeURIComponent(searchQuery)}&`;

    const url = `https://newsapi.org/v2/everything?${newsQuery}pageSize=5&page=${page}&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    return (data.articles || []).map(
      (item: any, index: number): FeedItem => ({
        id: `news-${page}-${index}`,
        source: "news",
        title: item.title,
        imageUrl: item.urlToImage || "",
        description: item.description || "",
        actionUrl: item.url,
      })
    );
  };

  const fetchTMDB = async (): Promise<FeedItem[]> => {
    const tmdbBaseUrl = `https://api.themoviedb.org/3/${
      query ? "search/movie" : "movie/popular"
    }`;
    const tmdbQuery = query ? `query=${encodeURIComponent(query)}&` : "";

    const url = `${tmdbBaseUrl}?${tmdbQuery}api_key=${TMDB_API_KEY}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    return (data.results || []).map(
      (item: any): FeedItem => ({
        id: `tmdb-${item.id}`,
        source: "tmdb",
        title: item.title,
        imageUrl: item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : "",
        description: item.overview || "",
        actionUrl: `https://www.themoviedb.org/movie/${item.id}`,
      })
    );
  };

  // Conditionally call APIs
  if (source === "news") {
    results.push(...(await fetchNews()));
  } else if (source === "tmdb") {
    results.push(...(await fetchTMDB()));
  } else if (source === "all") {
    const [newsResults, tmdbResults] = await Promise.all([
      fetchNews(),
      fetchTMDB(),
    ]);
    results.push(...newsResults, ...tmdbResults);
  }

  return results;
}
