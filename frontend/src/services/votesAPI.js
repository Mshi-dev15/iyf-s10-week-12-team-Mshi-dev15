import api from "./api";

// Vote on a post (upvote or downvote)
export const votePost = (postId, voteType) => api.post(`/posts/${postId}/vote`, { voteType });
