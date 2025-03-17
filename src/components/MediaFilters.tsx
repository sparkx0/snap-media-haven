
import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, X, Users, ImageIcon, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaType } from "@/types";

interface MediaFiltersProps {
  users: string[];
  isLoading: boolean;
  selectedUser: string;
  selectedMediaType: MediaType;
  onUserChange: (user: string) => void;
  onMediaTypeChange: (type: MediaType) => void;
}

const MediaFilters = ({
  users,
  isLoading,
  selectedUser,
  selectedMediaType,
  onUserChange,
  onMediaTypeChange,
}: MediaFiltersProps) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserSelect = (user: string) => {
    onUserChange(user);
    setIsUserDropdownOpen(false);
    setSearchQuery("");
  };

  const clearUserSelection = () => {
    onUserChange("");
  };

  return (
    <div className="p-6 bg-white border-b">
      <div className="flex flex-col md:flex-row gap-4">
        {/* User filter */}
        <div className="relative w-full md:w-64" ref={dropdownRef}>
          <button
            className={cn(
              "w-full flex items-center justify-between text-left px-4 py-2.5 rounded-lg border",
              isUserDropdownOpen ? "border-primary ring-1 ring-primary" : "border-gray-200"
            )}
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            disabled={isLoading}
            aria-expanded={isUserDropdownOpen}
            aria-haspopup="listbox"
          >
            <div className="flex items-center gap-2">
              <Users size={18} className="text-gray-500" />
              <span className="truncate">
                {selectedUser ? selectedUser : "All Users"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {selectedUser && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearUserSelection();
                  }}
                  className="p-1 rounded-full hover:bg-gray-100"
                  aria-label="Clear selection"
                >
                  <X size={14} />
                </button>
              )}
              <ChevronDown size={18} className={cn("transition-transform", isUserDropdownOpen && "rotate-180")} />
            </div>
          </button>

          {isUserDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg animate-fade-in">
              <div className="p-2 border-b">
                <div className="relative">
                  <Search size={16} className="absolute left-2.5 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-8 pr-4 py-2 text-sm border rounded-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <ul 
                className="max-h-60 overflow-y-auto py-1" 
                role="listbox"
                tabIndex={-1}
              >
                <li 
                  className={cn(
                    "px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2",
                    !selectedUser && "text-primary font-medium"
                  )}
                  onClick={() => handleUserSelect("")}
                  role="option"
                  aria-selected={!selectedUser}
                >
                  All Users
                </li>
                {filteredUsers.map((user) => (
                  <li
                    key={user}
                    className={cn(
                      "px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2",
                      selectedUser === user && "text-primary font-medium"
                    )}
                    onClick={() => handleUserSelect(user)}
                    role="option"
                    aria-selected={selectedUser === user}
                  >
                    {user}
                  </li>
                ))}
                {filteredUsers.length === 0 && (
                  <li className="px-3 py-2 text-gray-500 italic">No users found</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Media Type filter */}
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
          <button
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors",
              selectedMediaType === "all" 
                ? "bg-white text-primary shadow-sm" 
                : "hover:bg-white/70"
            )}
            onClick={() => onMediaTypeChange("all")}
            aria-pressed={selectedMediaType === "all"}
          >
            <span className="text-sm font-medium">All</span>
          </button>
          <button
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors",
              selectedMediaType === "images" 
                ? "bg-white text-primary shadow-sm" 
                : "hover:bg-white/70"
            )}
            onClick={() => onMediaTypeChange("images")}
            aria-pressed={selectedMediaType === "images"}
          >
            <ImageIcon size={16} />
            <span className="text-sm font-medium">Images</span>
          </button>
          <button
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors",
              selectedMediaType === "videos" 
                ? "bg-white text-primary shadow-sm" 
                : "hover:bg-white/70"
            )}
            onClick={() => onMediaTypeChange("videos")}
            aria-pressed={selectedMediaType === "videos"}
          >
            <VideoIcon size={16} />
            <span className="text-sm font-medium">Videos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaFilters;
