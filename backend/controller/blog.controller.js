export default Blog;

import Blog from "../model/blog.model.js";

export const addblog = async (req, res) => {
  try {
    const { content, title, date, imageUrl, username } = req.body;

    const createdBlog = new Blog({
      content: content,
      title: title,
      date: date,
      imageUrl: imageUrl,
      username: username,
    });

    await createdBlog.save();

    res.status(201).json({
      message: "User created successfully",
      blog: {
        content: createdBlog.content,
        title: createdBlog.title,
        date: createdBlog.date,
        imageUrl: createdBlog.imageUrl,
        username: createdBlog.username,
        _id: createdBlog._id,
      },
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
