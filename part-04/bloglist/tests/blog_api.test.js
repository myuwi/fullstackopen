import assert from "node:assert";
import { test, after, beforeEach } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";

import Blog from "../models/blog.js";

import * as helpers from "./test_helper.js";

const initialBlogs = helpers.blogs.splice(1, 2);

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

after(async () => await mongoose.connection.close());

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const res = await api.get("/api/blogs");
  assert.strictEqual(res.body.length, 2);
});

test("blogs have an id", async () => {
  const blogs = await helpers.blogsInDb();
  blogs.forEach((blog) => {
    assert(blog.id);
    assert.strictEqual(blog._id, undefined);
  });
});

test("a valid blog can be added", async () => {
  const newBlog = helpers.blogs[2];

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsInDb = await helpers.blogsInDb();

  assert.strictEqual(blogsInDb.length, initialBlogs.length + 1);
  assert(blogsInDb.some((blog) => blog.title === newBlog.title));
});
