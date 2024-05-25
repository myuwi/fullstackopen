import express from "express";
import jwt from "jsonwebtoken";

import config from "../utils/config.js";

import Blog from "../models/blog.js";
import User from "../models/user.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (_, res) => {
  const blogs = await Blog.find({}).populate("user", {
    id: 1,
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const decodedToken = jwt.verify(req.token, config.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({
      error: "invalid token",
    });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    ...req.body,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const blog = { title, author, url, likes };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!updatedBlog) {
    return res.sendStatus(404);
  }

  res.json(updatedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const decodedToken = jwt.verify(req.token, config.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({
      error: "invalid token",
    });
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.sendStatus(404);
  }

  if (blog.user.toString() !== decodedToken.id) {
    return res.status(403).json({
      error: "this blog is owned by another user",
    });
  }

  await blog.deleteOne();
  res.sendStatus(204);
});

export default blogsRouter;
