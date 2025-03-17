
import { useState, useEffect } from "react";
import { Download, Image as ImageIcon, Video } from "lucide-react";
import { formatDate, downloadMedia, isImage, isVideo } from "@/utils/mediaUtils";
import { MediaItem } from "@/types";
import { toast } from "@/components/ui/sonner";

interface MediaCardProps {
  media: MediaItem;
}

const MediaCard = ({ media }: MediaCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Reset loading state when media changes
    setIsLoaded(false);
  }, [media.mediaUrl]);

  const handleDownload = () => {
    try {
      downloadMedia(media.mediaUrl, media.username, media.timestamp, media.extension);
      toast.success("Media download started");
    } catch (error) {
      toast.error("Failed to download media");
      console.error("Download error:", error);
    }
  };

  const handleMediaLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="media-card group animate-fade-up hover-scale">
      {/* Media preview */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse-light">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {isImage(media) ? (
          <img
            src={media.mediaUrl}
            alt={`Media by ${media.username}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleMediaLoad}
            loading="lazy"
          />
        ) : (
          <video
            src={media.mediaUrl}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadedData={handleMediaLoad}
            onClick={() => setIsPlaying(!isPlaying)}
            autoPlay={false}
            controls={isPlaying}
            loop
            muted={!isPlaying}
            poster=""
          />
        )}

        {/* Media type icon */}
        <div className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full">
          {isImage(media) ? (
            <ImageIcon size={14} />
          ) : (
            <Video size={14} />
          )}
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-gray-900 truncate">{media.username}</h3>
            <p className="text-xs text-gray-500">{formatDate(media.timestamp)}</p>
          </div>
          <button 
            onClick={handleDownload}
            className="text-gray-500 hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10"
            aria-label="Download media"
          >
            <Download size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
