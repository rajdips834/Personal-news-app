"use client";

import { useEffect, useState } from "react";
import { FeedItem } from "@/types";

export const useLiveFeed = () => {
  const [messages, setMessages] = useState<FeedItem[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/feed");

    eventSource.onmessage = (event) => {
      const newItem: FeedItem = JSON.parse(event.data);
      setMessages((prev) => [newItem, ...prev]);
    };

    eventSource.onerror = () => {
      console.error("SSE connection error");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return messages;
};
