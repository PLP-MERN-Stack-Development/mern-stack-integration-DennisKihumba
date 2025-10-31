// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
});

export const getPosts = () => API.get("/posts");
export const createPost = (postData) => API.post("/posts", postData);
export const getPostById = (id) => API.get(`/posts/${id}`);

export default { getPosts, createPost, getPostById };
