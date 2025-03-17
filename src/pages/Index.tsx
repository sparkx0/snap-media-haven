
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import Header from "@/components/Header";
import MediaFilters from "@/components/MediaFilters";
import MediaGrid from "@/components/MediaGrid";
import Pagination from "@/components/Pagination";
import { fetchMedia, fetchUsers } from "@/services/api";
import { MediaItem, MediaType } from "@/types";
import { isImage, isVideo } from "@/utils/mediaUtils";

const ITEMS_PER_PAGE = 40;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>("all");
  const [filteredMedia, setFilteredMedia] = useState<MediaItem[]>([]);

  // Fetch users
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Fetch media
  const {
    data: mediaData,
    isLoading: isLoadingMedia,
    error: mediaError,
    refetch: refetchMedia,
  } = useQuery({
    queryKey: ["media", currentPage, selectedUser],
    queryFn: () => fetchMedia(currentPage, selectedUser),
  });

  // Handle errors
  useEffect(() => {
    if (usersError) {
      toast.error("Failed to load users. Please try again.");
      console.error("Users error:", usersError);
    }

    if (mediaError) {
      toast.error("Failed to load media. Please try again.");
      console.error("Media error:", mediaError);
    }
  }, [usersError, mediaError]);

  // Reset page when changing filters
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedUser, selectedMediaType]);

  // Filter media by type
  useEffect(() => {
    if (!mediaData?.data) {
      setFilteredMedia([]);
      return;
    }

    let filtered = [...mediaData.data];

    if (selectedMediaType === "images") {
      filtered = filtered.filter(isImage);
    } else if (selectedMediaType === "videos") {
      filtered = filtered.filter(isVideo);
    }

    setFilteredMedia(filtered);
  }, [mediaData, selectedMediaType]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUserChange = (user: string) => {
    setSelectedUser(user);
  };

  const handleMediaTypeChange = (type: MediaType) => {
    setSelectedMediaType(type);
  };

  const isLoading = isLoadingMedia || isLoadingUsers;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <MediaFilters
          users={users}
          isLoading={isLoading}
          selectedUser={selectedUser}
          selectedMediaType={selectedMediaType}
          onUserChange={handleUserChange}
          onMediaTypeChange={handleMediaTypeChange}
        />
        
        <MediaGrid 
          media={filteredMedia} 
          isLoading={isLoading} 
        />
        
        {!isLoading && mediaData?.totalPages > 0 && (
          <div className="mt-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={mediaData.totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
