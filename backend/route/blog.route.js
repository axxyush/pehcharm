import express from "express";
import { addblog } from "../controller/blog.controller.js";
// import Blog from "../model/blog.model.js";
const router = express.Router();

router.post("/addblog", addblog);

// Route to get user data by username
// router.get("/:username", async (req, res) => {
//   try {
//     const { username } = req.params;
//     const blog = await Blog.find({ username });

//     if (!blog) {
//       return res.status(404).json({ message: "No blogs by user" });
//     }
//     res.json(blog);
//   } catch (error) {
//     console.error("Error fetching user blog data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

export default router;
