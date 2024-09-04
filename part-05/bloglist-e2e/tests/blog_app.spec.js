// @ts-check
import { test, expect } from "@playwright/test";
import { loginWith } from "./helpers.js";

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
});
