import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
