import api from "./api";

// Get comments for a specific post
export const getComments = (postId) => api.get(`/posts/${postId}/comments`);

// Create a comment on a post
export const createComment = (postId, data) => api.post(`/posts/${postId}/comments`, data);

// Delete a comment
export const deleteComment = (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`);
