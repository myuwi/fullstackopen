import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Stack, Title } from "@mantine/core";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import User from "./components/User";
import Users from "./components/Users";

import { useNotification } from "./contexts/NotificationContext";
import { useUser } from "./contexts/UserContext";
import { useCreateBlogMutation } from "./queries/blogs";

const App = () => {
  const { mutateAsync: createBlog } = useCreateBlogMutation();

  const { showNotification } = useNotification();
  const { user } = useUser();

  const blogFormRef = useRef(null);

  const handleCreate = async (blog) => {
    try {
      await createBlog(blog);
      showNotification({
        message: `A new blog ${blog.title} by ${blog.author} added`,
        type: "success",
      });
      blogFormRef.current.toggleVisibility();
    } catch (err) {
      showNotification({
        message: "Failed to submit blog",
        type: "error",
      });
      // ugly and spaghetti, but simplest way to cancel clearing fields on error
      throw err;
    }
  };

  if (!user) return <Login />;

  return (
    <Container pb="xl">
      <Stack gap="xs">
        <Navbar />
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <Stack>
                <Title order={2}>Blogs</Title>
                <Togglable buttonLabel="Submit new blog" ref={blogFormRef}>
                  <BlogForm handleCreate={handleCreate} />
                </Togglable>
                <BlogList />
              </Stack>
            }
          ></Route>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Stack>
    </Container>
  );
};

export default App;
