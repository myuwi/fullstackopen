// @ts-check
import { test, expect } from "@playwright/test";
import { createBlog, loginWith } from "./helpers.js";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Test User",
        username: "test-user",
        password: "pa$$word",
      },
    });
    await request.post("/api/users", {
      data: {
        name: "Another User",
        username: "another-user",
        password: "d!ff€rent-pa$$word",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const loginHeader = page.getByText("log in to application");
    await expect(loginHeader).toBeVisible();
  });

  test.describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "test-user", "pa$$word");
      await expect(page.getByText("Test User logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "test-user", "wrong pa$$word");
      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "test-user", "pa$$word");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "foo", "bar", "baz");
      await expect(page.getByText("foo bar")).toBeVisible();
    });

    test.describe("and blogs exists", () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(page, "blog 1", "foo", "url");
        await createBlog(page, "blog 2", "bar", "url");
        await createBlog(page, "blog 3", "baz", "url");
      });

      test("a blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).first().click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("a blog can be deleted by its creator", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "view" }).first().click();
        await page.getByRole("button", { name: "remove" }).click();
        await expect(page.getByText("blog 1 by foo removed")).toBeVisible();
        await expect(page.getByText("blog 1 foo")).not.toBeVisible();
      });

      test("a blog can not be deleted by a user that is not its creator", async ({
        page,
      }) => {
        await page.getByRole("button", { name: "logout" }).click();
        await loginWith(page, "another-user", "d!ff€rent-pa$$word");
        await page.getByRole("button", { name: "view" }).first().click();
        const deleteButton = page.getByRole("button", { name: "remove" });
        await expect(deleteButton).not.toBeVisible();
      });
    });
  });
});
