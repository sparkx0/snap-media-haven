
import { MediaItem } from "@/types";
import MediaCard from "./MediaCard";

interface MediaGridProps {
  media: MediaItem[];
  isLoading: boolean;
}

const MediaGrid = ({ media, isLoading }: MediaGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {Array.from({ length: 40 }).map((_, index) => (
          <div key={index} className="media-card animate-pulse">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">📷</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No media found</h3>
        <p className="text-gray-500 max-w-md">
          Try adjusting your filters or check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {media.map((item, index) => (
        <MediaCard key={`${item.username}-${item.timestamp}-${index}`} media={item} />
      ))}
    </div>
  );
};

export default MediaGrid;
