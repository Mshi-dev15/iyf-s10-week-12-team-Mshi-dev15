import api from "./api";

export const getPosts = () => api.get("/posts");
export const createPost = (data) => api.post("/posts", data);