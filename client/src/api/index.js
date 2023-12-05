import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5100" });

//this is a function that happens on each request Need to send our token to the backend to verify
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//this connects client to server side post routes
export const createPost = (newPost) => API.post("/posts/create-posts", newPost);
export const fetchPosts = () => API.get("/posts");
export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const fetchPostByUserId = (userId) =>
  API.get(`/posts/get-user-post/${userId}`);
export const fetchComments = (postId) => API.get(`/posts/comments/${postId}`);
export const likePost = (id) => API.get(`/posts/like/${id}`);
export const likePostComment = (id, rid = null) => {
  const endpoint = rid
    ? `/posts/like-comment/${id}/${rid}`
    : `/posts/like-comment/${id}`;
  return API.post(endpoint);
};
export const commentPost = (id) => API.post(`/posts/comment/${id}`);
export const replyPostComment = (id) => API.post(`/posts/reply-comment/${id}`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

//this connects client to server side auth routes
export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);

//this connects client to server side user routes
export const requestPasswordReset = (formData) =>
  API.post("/users/request-passwordreset", formData);
export const getUser = (id) => API.get(`/users/get-user/${id}`);
export const updateUser = (formData) => API.put("/users/update-user", formData);
export const friendRequest = (reqTo) =>
  API.post(`/users/friend-request`, reqTo);
export const getFriendRequest = () => API.get("/users/get-friend-request");
export const acceptFriendRequest = (id, status) =>
  API.post("/users/accept-request", { rid: id, status });
export const viewProfile = (id) => API.post("/users/profile-view", id);
export const suggestedFriends = () => API.get("/users/suggested-friends");
