
export interface User {
  username: string;
}

export interface MediaItem {
  mediaUrl: string;
  extension: 1 | 2; // 1 = Image, 2 = Video
  timestamp: number;
  username: string;
}

export interface ApiResponse {
  data: MediaItem[];
  totalPages: number;
  currentPage: number;
}

export interface UsersResponse {
  users: User[];
}

export type MediaType = 'all' | 'images' | 'videos';
