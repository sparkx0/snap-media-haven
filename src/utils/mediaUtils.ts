
import { MediaItem } from "@/types";

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

export const isImage = (media: MediaItem): boolean => {
  return media.extension === 1;
};

export const isVideo = (media: MediaItem): boolean => {
  return media.extension === 2;
};

export const downloadMedia = (mediaUrl: string, username: string, timestamp: number, extension: 1 | 2): void => {
  const link = document.createElement('a');
  link.href = mediaUrl;
  
  const date = new Date(timestamp);
  const formattedDate = date.toISOString().split('T')[0];
  
  const fileExtension = extension === 1 ? 'jpg' : 'mp4';
  link.download = `${username}_${formattedDate}.${fileExtension}`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
