import express from "express";
import Blog from "../models/blog.js";

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
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      error: "invalid token",
    });
  }

  const blog = new Blog({
    ...req.body,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  const populatedBlog = await savedBlog.populate("user", {
    id: 1,
    username: 1,
    name: 1,
  });

  res.status(201).json(populatedBlog);
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({
      error: "comment cannot be empty",
    });
  }

  const blog = await Blog.findById(req.params.id);

  blog.comments = blog.comments.concat(comment);
  await blog.save();

  const populatedBlog = await blog.populate("user", {
    id: 1,
    username: 1,
    name: 1,
  });

  res.status(201).json(populatedBlog);
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

  const populatedBlog = await updatedBlog.populate("user", {
    id: 1,
    username: 1,
    name: 1,
  });

  res.json(populatedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      error: "invalid token",
    });
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.sendStatus(404);
  }

  if (blog.user.toString() !== user.id) {
    return res.status(403).json({
      error: "this blog is owned by another user",
    });
  }

  await blog.deleteOne();

  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== blog._id.toString(),
  );
  await user.save();

  res.sendStatus(204);
});

export default blogsRouter;
