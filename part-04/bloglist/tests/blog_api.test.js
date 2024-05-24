import assert from "node:assert";
import { after, beforeEach, describe, test } from "node:test";
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

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const res = await api.get("/api/blogs");
    assert.strictEqual(res.body.length, 2);
  });

  test("all blogs have an id", async () => {
    const blogs = await helpers.blogsInDb();
    blogs.forEach((blog) => {
      assert(blog.id);
      assert.strictEqual(blog._id, undefined);
    });
  });

  describe("adding a new blog", () => {
    test("succeeds when all fields are defined", async () => {
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

    test("succeeds when likes isn't defined, defaults to 0", async () => {
      const newBlog = {
        title: "A blog with 0 likes",
        author: "Unpopular Author",
        url: "localhost",
      };

      const res = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(res.body.likes, 0);
    });

    test("fails when title is missing", async () => {
      const newBlog = {
        author: "Author",
        url: "localhost",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const blogsInDb = await helpers.blogsInDb();
      assert.strictEqual(blogsInDb.length, initialBlogs.length);
    });

    test("fails when url is missing", async () => {
      const newBlog = {
        title: "Blog without an url",
        author: "Author",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const blogsInDb = await helpers.blogsInDb();
      assert.strictEqual(blogsInDb.length, initialBlogs.length);
    });
  });
});
