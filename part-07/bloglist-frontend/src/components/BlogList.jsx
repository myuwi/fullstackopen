import { Link } from "react-router-dom";
import { Button, Stack } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useBlogsQuery } from "../queries/blogs";

const BlogList = () => {
  const { data: blogs = [] } = useBlogsQuery();
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

  const icon = <IconArrowRight size={14} />;

  return (
    <Stack gap="xs">
      {sortedBlogs.map((blog) => (
        <Button
          variant="default"
          justify="space-between"
          rightSection={icon}
          component={Link}
          to={`/blogs/${blog.id}`}
          key={blog.id}
        >
          {blog.title} by {blog.author}
        </Button>
      ))}
    </Stack>
  );
};

export default BlogList;
