import api from "./api";

export const getPosts = () => api.get("/posts");
export const getPostById = (postId) => api.get(`/posts/${postId}`);
export const createPost = (data) => api.post("/posts", data);