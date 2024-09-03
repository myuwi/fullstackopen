import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("BlogForm", () => {
  const blog = {
    title: "Micro-libraries need to die already",
    author: "Ben Visness",
    url: "https://bvisness.me/microlibraries/",
  };

  test("handleCreate callback is called on form submit", async () => {
    const user = userEvent.setup();
    const mockCreateHandler = vi.fn();
    render(<BlogForm handleCreate={mockCreateHandler} />);

    const titleInput = screen.getByRole("textbox", { name: "Title" });
    const authorInput = screen.getByRole("textbox", { name: "Author" });
    const urlInput = screen.getByRole("textbox", { name: "Url" });
    const submitButton = screen.getByRole("button", { name: "create" });

    await user.type(titleInput, blog.title);
    await user.type(authorInput, blog.author);
    await user.type(urlInput, blog.url);
    await user.click(submitButton);

    expect(mockCreateHandler).toHaveBeenCalledWith(blog);
  });
});
