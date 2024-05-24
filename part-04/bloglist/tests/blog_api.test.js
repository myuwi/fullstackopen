import assert from "node:assert";
import { test, after, beforeEach } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";

import Blog from "../models/blog.js";

import { blogs } from "./test_helper.js";

const initialBlogs = blogs.splice(1, 2);

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
