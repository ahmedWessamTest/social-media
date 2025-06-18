import { env } from "../environment/environment";
import api from "./apiEnvironment";

export async function getAllPosts(page) {
  const req = await api.get(`/posts?page=${page}`);
  return await req.data;
}

export async function getUserPosts() {
  const req = await api.get(`/users/${env.loggedUserData._id}/posts`);
  return req.data;
}
export async function getUserData() {
  const req = await api.get(`/users/profile-data`);
  return req.data;
}

export async function updatePost(postId, formData) {
  const req = await api.put(`/posts/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return req.data;
}

export async function sendComment(content, postId) {
  const userComment = {
    content: content,
    post: postId,
  };
  const req = await api.post(`/comments`, userComment);
  return await req.data;
}

export async function updateComment(content, commentId) {
  const userComment = {
    content,
  };
  const req = await api.put(`/comments/${commentId}`, userComment);
  return await req.data;
}

export async function deletePost(postId) {
  const req = await api.delete(`/posts/${postId}`);
  return await req.data;
}

export async function deleteComment(commentId) {
  const req = await api.delete(`/comments/${commentId}`);
  return req.data;
}
