// src/components/PostList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.getPosts();
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
              cursor: "pointer",
              backgroundColor: "#fefefe"
            }}
          >
            {/* Wrap title in Link to PostDetail page */}
            <Link
              to={`/posts/${post._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h3>{post.title}</h3>
              <p>{post.content.slice(0, 100)}...</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
