import React from "react";
import { useMatch, useNavigate, Link } from "react-router-dom";
import {
  ActionIcon,
  Anchor,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconExternalLink,
  IconHeartFilled,
  IconDots,
  IconTrash,
} from "@tabler/icons-react";

import CommentForm from "./CommentForm";
import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";
import {
  useBlogsQuery,
  useCommentBlogMutation,
  useLikeBlogMutation,
  useDeleteBlogMutation,
} from "../queries/blogs";

const BlogPage = () => {
  const { data: blogs = [] } = useBlogsQuery();
  const { user } = useUser();
  const match = useMatch("/blogs/:id");
  const id = match?.params.id;
  const blog = blogs.find((blog) => blog.id === id);

  const deletable = !!user && blog?.user.id === user.id;

  const { mutateAsync: addComment } = useCommentBlogMutation();
  const { mutateAsync: likeBlog } = useLikeBlogMutation();
  const { mutateAsync: deleteBlog } = useDeleteBlogMutation();

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleLike = async () => likeBlog(blog);

  const handleComment = async (comment) =>
    addComment({ blogId: blog.id, comment });

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog);
      showNotification({
        message: `${blog.title} by ${blog.author} removed`,
        type: "success",
      });
      navigate("/");
    }
  };

  if (!blog) return null;

  return (
    <Stack>
      <Stack gap="xs">
        <Stack gap="0.25rem">
          <Title order={2}>
            {blog.title} by {blog.author}
          </Title>
          <Text c="dimmed" size="sm">
            Submitted by{" "}
            <Anchor component={Link} to={`/users/${blog.user.id}`}>
              {blog.user.name || blog.user.username}
            </Anchor>
          </Text>
        </Stack>
        <Anchor href={blog.url}>
          {blog.url} <IconExternalLink size={14} />
        </Anchor>
      </Stack>

      <Group justify="space-between">
        <Group gap="xs">
          <Text>{blog.likes} Likes</Text>
          <ActionIcon
            size="xl"
            radius="xl"
            variant="subtle"
            color="red"
            onClick={handleLike}
          >
            <IconHeartFilled />
          </ActionIcon>
        </Group>
        <Menu shadow="sm" width={200}>
          <Menu.Target>
            <ActionIcon size="xl" radius="xl" variant="subtle" color="dark">
              <IconDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item
              color="red"
              leftSection={<IconTrash size={14} />}
              disabled={!deletable}
              onClick={handleDelete}
            >
              Delete blog
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Stack>
        <Title order={3}>{blog.comments.length} comments</Title>
        <CommentForm onSubmit={handleComment} />
        <Stack gap="xs">
          {blog.comments.map((comment, i) => {
            return (
              <Paper key={i} withBorder p="lg">
                <Stack gap="xs">
                  <Text c="dimmed" size="sm">
                    Anonymous commented:
                  </Text>
                  <Text size="sm">{comment}</Text>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BlogPage;
