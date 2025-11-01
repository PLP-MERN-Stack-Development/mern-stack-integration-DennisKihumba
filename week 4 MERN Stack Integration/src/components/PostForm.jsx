// src/components/PostForm.jsx
import React, { useState } from "react";
import API from "../api";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await API.createPost({ title, content });
      setTitle("");
      setContent("");
      alert("Post created successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to create post. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
        {loading ? "Creating..." : "Create Post"}
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </form>
  );
};

export default PostForm;
