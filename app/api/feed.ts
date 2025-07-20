// pages/api/feed.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendData = () => {
    const data = {
      id: Date.now(),
      title: "🔥 Live Update",
      description: `This is a live message at ${new Date().toLocaleTimeString()}`,
      source: "live",
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send every 5 seconds
  const intervalId = setInterval(sendData, 5000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
}
