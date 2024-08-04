export default Blog;

import Blog from "../model/blog.model.js";

export const create = async (req, res) => {
  try {
    const { content, title, date, image, email } = req.body;

    const createdBlog = new Blog({
      content: content,
      title: title,
      date: date,
      image: image,
      email: email,
    });

    await createdBlog.save();

    res.status(201).json({
      message: "User created successfully",
      blog: {
        content: createdBlog.content,
        title: createdBlog.title,
        date: createdBlog.date,
        image: createdBlog.image,
        email: createdBlog.email,
        _id: createdBlog._id,
      },
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
