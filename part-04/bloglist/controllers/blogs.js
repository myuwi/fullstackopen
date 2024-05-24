import express from "express";
import Blog from "../models/blog.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (_, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).json(result);
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
  await Blog.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default blogsRouter;
