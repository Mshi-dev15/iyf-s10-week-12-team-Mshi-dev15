import api from "./api";

// Bookmark/Unbookmark a post
export const toggleBookmark = (postId) => api.post(`/posts/${postId}/bookmark`);

// Share a post (increment share count)
export const sharePost = (postId) => api.post(`/posts/${postId}/share`);

// Get trending posts
export const getTrendingPosts = (limit = 5) => api.get(`/posts/trending?limit=${limit}`);
