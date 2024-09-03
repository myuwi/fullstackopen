import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog", () => {
  const blog = {
    title: "Micro-libraries need to die already",
    author: "Ben Visness",
    url: "https://bvisness.me/microlibraries/",
    likes: 10,
    user: { username: "usr", name: "Test User" },
  };

  const props = {
    blog,
    deletable: false,
    onLike: () => {},
    onDelete: () => {},
  };

  test("renders minimized", () => {
    render(<Blog {...props} />);

    const element = screen.getByText(`${blog.title} ${blog.author}`);
    expect(element).toBeInTheDocument();

    expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument();
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
  });

  test("can be opened", async () => {
    const user = userEvent.setup();
    render(<Blog {...props} />);

    const button = screen.getByRole("button", { name: "view" });
    await user.click(button);

    expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument();
    expect(screen.getByText(blog.url)).toBeInTheDocument();
  });
});
