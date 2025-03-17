
import { ApiResponse, UsersResponse } from "@/types";

const BASE_URL = "https://script.google.com/macros/s/AKfycbwpEP_w5GL0zan7P6k5xKfunfqBUh-BJOtficTfiQLNtXa1a421dvg3BJTEUsnYmmLAow/exec";

export const fetchUsers = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}?endpoint=users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data: UsersResponse = await response.json();
    return data.users.map(user => user.username);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchMedia = async (
  page: number = 1,
  user: string = ""
): Promise<ApiResponse> => {
  try {
    const url = `${BASE_URL}?page=${page}${user ? `&user=${user}` : ""}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch media');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching media:", error);
    throw error;
  }
};
