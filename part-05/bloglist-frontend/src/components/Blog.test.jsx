import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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

    const url = screen.queryByText(blog.url);
    assert.isNull(url);
  });
});
