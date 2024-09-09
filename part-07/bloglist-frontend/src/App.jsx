import { useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import User from "./components/User";
import Users from "./components/Users";
import { useNotification } from "./contexts/NotificationContext";
import { useUser } from "./contexts/UserContext";
import { useCreateBlogMutation } from "./queries/blogs";

const App = () => {
  const { mutateAsync: createBlog } = useCreateBlogMutation();

  const { showNotification, hideNotification } = useNotification();
  const { user, login, logout } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      hideNotification();
      setUsername("");
      setPassword("");
    } catch (err) {
      showNotification({
        message: "wrong username or password",
        type: "error",
      });
    }
  };

  const handleLogout = () => {
    logout();
    hideNotification();
  };

  const handleCreate = async (blog) => {
    try {
      await createBlog(blog);
      showNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        type: "success",
      });
      blogFormRef.current.toggleVisibility();
    } catch (err) {
      showNotification({
        message: "failed to create blog",
        type: "error",
      });
      // ugly and spaghetti, but simplest way to cancel clearing fields on error
      throw err;
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              aria-label="Username"
              name="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            password
            <input
              aria-label="Password"
              name="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name || user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm handleCreate={handleCreate} />
              </Togglable>
              <BlogList />
            </div>
          }
        ></Route>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
