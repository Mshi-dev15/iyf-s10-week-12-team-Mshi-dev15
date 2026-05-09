import api from "./api";

export const getPosts = () => api.get("/posts")
export const getPostById = (id) => api.get(`/posts/${id}`)
export const createPost = (data) => api.post("/posts", data)
export const getComments = (postId) => api.get(`/posts/${postId}/comments`)
export const createComment = (postId, data) => api.post(`/posts/${postId}/comments`, data)