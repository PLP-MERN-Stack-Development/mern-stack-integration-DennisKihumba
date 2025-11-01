import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      padding: "10px",
      background: "#333",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2>My Blog</h2>
      <div>
        <Link to="/" style={{ color: "white", marginRight: "15px" }}>Home</Link>
        <Link to="/create" style={{ color: "white" }}>Create Post</Link>
      </div>
    </nav>
  );
}
