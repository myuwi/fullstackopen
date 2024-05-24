import { test, describe } from "node:test";
import assert from "node:assert";

import listHelper from "../utils/list_helper.js";

import { blogs } from "./test_helper.js";

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const oneBlog = blogs.slice(0, 1);
    const result = listHelper.totalLikes(oneBlog);
    assert.strictEqual(result, 7);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

describe("favorite blog", () => {
  test("of empty list is undefined", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, undefined);
  });

  test("when list has only one blog, equals that", () => {
    const blog = blogs[0];
    const result = listHelper.favoriteBlog([blog]);
    assert.deepStrictEqual(result, blog);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(blogs);
    const favoriteBlog = blogs[2];
    assert.deepStrictEqual(result, favoriteBlog);
  });
});

describe("most blogs", () => {
  test("of empty list is undefined", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, undefined);
  });

  test("when list has only one blog, equals the author of that", () => {
    const blog = blogs[0];
    const result = listHelper.mostBlogs([blog]);
    const author = { author: blog.author, blogs: 1 };
    assert.deepStrictEqual(result, author);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostBlogs(blogs);
    const author = { author: "Robert C. Martin", blogs: 3 };
    assert.deepStrictEqual(result, author);
  });
});

describe("most likes", () => {
  test("of empty list is undefined", () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, undefined);
  });

  test("when list has only one blog, equals the author of that", () => {
    const blog = blogs[0];
    const result = listHelper.mostLikes([blog]);
    const author = { author: blog.author, likes: blog.likes };
    assert.deepStrictEqual(result, author);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostLikes(blogs);
    const author = { author: "Edsger W. Dijkstra", likes: 17 };
    assert.deepStrictEqual(result, author);
  });
});
