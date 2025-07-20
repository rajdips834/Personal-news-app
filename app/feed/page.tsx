import { FeedContent } from "@/components/feed/FeedContent";

export default function FeedPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Personalized Feed</h1>
      <FeedContent />
    </div>
  );
}
