import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch(err => console.log(err));
app.use("/api/auth", authRoutes);

// Simple Post model
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Post = mongoose.model("Post", PostSchema);

// Routes
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  const newPost = await Post.create(req.body);
  res.status(201).json(newPost);
});

app.get("/api/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
