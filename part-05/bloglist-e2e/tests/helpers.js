export const loginWith = async (page, username, password) => {
  await page.getByRole("textbox", { name: "Username" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

export const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByRole("textbox", { name: "Title" }).fill(title);
  await page.getByRole("textbox", { name: "Author" }).fill(author);
  await page.getByRole("textbox", { name: "Url" }).fill(url);
  await page.getByRole("button", { name: "create" }).click();
  await page.getByText(`${title} ${author}`).waitFor();
};

/**
 * Like blog in the `n`th position `amount` times
 */
export const likeBlog = async (page, n, amount) => {
  await page.getByRole("button", { name: "view" }).nth(n).click();
  for (let i = 1; i <= amount; i++) {
    await page.getByRole("button", { name: "like" }).click();
    await page.getByText(`likes ${i}`).waitFor();
  }
  await page.getByRole("button", { name: "hide" }).click();
};
