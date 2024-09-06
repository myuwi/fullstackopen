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

  const defaultProps = {
    blog,
    deletable: false,
    onLike: () => {},
    onDelete: () => {},
  };

  test("renders minimized", () => {
    render(<Blog {...defaultProps} />);

    const element = screen.getByText(`${blog.title} ${blog.author}`);
    expect(element).toBeInTheDocument();

    expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument();
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
  });

  test("can be opened", async () => {
    const user = userEvent.setup();
    render(<Blog {...defaultProps} />);

    const button = screen.getByRole("button", { name: "view" });
    await user.click(button);

    expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument();
    expect(screen.getByText(blog.url)).toBeInTheDocument();
  });

  test("clicking like triggers callback function", async () => {
    const user = userEvent.setup();
    const mockLikeHandler = vi.fn();
    const props = { ...defaultProps, onLike: mockLikeHandler };

    render(<Blog {...props} />);

    const button = screen.getByRole("button", { name: "view" });
    await user.click(button);

    const likeButton = screen.getByRole("button", { name: "like" });
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLikeHandler).toHaveBeenCalledTimes(2);
  });
});
