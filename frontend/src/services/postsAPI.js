import api from "./api";

export const getPosts = () => api.get("/posts");
export const getPostById = (postId) => api.get(`/posts/${postId}`);
export const createPost = (data) => api.post("/posts", data);

// ✅ Add this to the bottom of postsAPI.js to fix import error
export const getUserProfile = async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user profile');
  const data = await response.json();
  return data?.data || data;
};