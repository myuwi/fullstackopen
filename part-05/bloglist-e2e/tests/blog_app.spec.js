// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const loginHeader = page.getByText("log in to application");
    await expect(loginHeader).toBeVisible();
  });
});
