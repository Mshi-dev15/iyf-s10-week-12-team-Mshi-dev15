import api from "./api";

const unwrap = (response) => response.data?.data ?? response.data;

export const getPosts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  const url = queryString ? `/posts?${queryString}` : '/posts'
  const response = await api.get(url);
  return {
    posts: response.data?.data ?? [],
    pagination: response.data?.pagination,
    count: response.data?.count ?? 0
  };
};

export const getPost = async (postId) => {
  const response = await api.get(`/posts/${postId}`);
  return unwrap(response);
};

export const createPost = async (data) => {
  const response = await api.post("/posts", data);
  return unwrap(response);
};

export const likePost = async (postId) => {
  const response = await api.post(`/posts/${postId}/like`);
  return unwrap(response);
};

export const votePost = async (postId, voteType) => {
  const response = await api.post(`/posts/${postId}/vote`, { voteType });
  return unwrap(response);
};

export const getComments = async (postId) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return unwrap(response);
};

export const createComment = async (postId, data) => {
  const response = await api.post(`/posts/${postId}/comments`, data);
  return unwrap(response);
};

export const getUserProfile = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return unwrap(response);
};
