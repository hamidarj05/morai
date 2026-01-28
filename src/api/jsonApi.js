import axiosClient from "./axiosClient";

// Returner Data De json-server 

// ===== gerer les users =====
export function getUsers() {
  return axiosClient.get("/users");
}

// ===== gerer les cities =====
export function getCities() {
  return axiosClient.get("/cities");
}
export function createCity(data) {
  return axiosClient.post("/cities", data);
}
export function deleteCity(id) {
  return axiosClient.delete(`/cities/${id}`);
}
// ===== gerer les spots =====
export function getSpotsByCity(cityId) {
  return axiosClient.get("/spots", {
    params: { cityId },
  });
}
export function getSpots(params) { 
  return axiosClient.get("/spots", { params });
}
export function createSpot(data) {
  return axiosClient.post("/spots", data);
}
export function deleteSpot(id) {
  return axiosClient.delete(`/spots/${id}`);
}
// ===== gerer les scams =====
export function getScamsByCity(cityId) {
  return axiosClient.get("/scams", {
    params: { cityId },
  });
}

export function getScams(params) { 
  return axiosClient.get("/scams", { params });
}
export function createScam(data) {
  return axiosClient.post("/scams", data);
}
export function deleteScam(id) {
  return axiosClient.delete(`/scams/${id}`);
}
// ===== gerer les posts =====
export function getPosts() {
  return axiosClient.get("/posts");
} 
export function getPostsByCity(cityId) {
  return axiosClient.get("/posts", {
    params: { cityId },
  });
} 

export function createPost(data) {
  return axiosClient.post("/posts", data);
}

export function deletePost(postId) {
  return axiosClient.delete(`/posts/${postId}`);
}
export function updatePost(postId, data) {
  return axiosClient.patch(`/posts/${postId}`, data);
}

// ===== gerer les commentaires =====
export function getComments() {
  return axiosClient.get("/comments");
}

export function deleteComment(commentId) {
  return axiosClient.delete(`/comments/${commentId}`);
}
export function getCommentsByPost(postId) {
  return axiosClient.get("/comments", {
    params: { postId },
  });
}

export function addComment(data) {
  return axiosClient.post("/comments", data);
}
// ===== CHATS AI =====
export function getChatsAi({cityId, userId}) {
  return axiosClient.get("/chatsAi", {
    params: { cityId, userId },
  });
}

export function addChatAiMessage(data) {
  return axiosClient.post("/chatsAi", data);
}

export function deleteChatAiMessage(id) {
  return axiosClient.delete(`/chatsAi/${id}`);
}
