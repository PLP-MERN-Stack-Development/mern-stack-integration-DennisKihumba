// src/components/PostDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // for navigation
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.getPostById(id);
        setPost(response.data);
      } catch (err) {
        setError("Failed to fetch post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "10px" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        ← Back to Posts
      </button>
    </div>
  );
};

export default PostDetail;
