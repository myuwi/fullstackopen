import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useNotification } from "./contexts/NotificationContext";
import blogService from "./services/blogs";
import loginService from "./services/login";
import {
  useBlogsQuery,
  useCreateBlogMutation,
  useLikeBlogMutation,
  useDeleteBlogMutation,
} from "./queries/blogs";

const App = () => {
  const { data: blogs = [] } = useBlogsQuery();
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);
  const { mutateAsync: createBlog } = useCreateBlogMutation();
  const { mutateAsync: likeBlog } = useLikeBlogMutation();
  const { mutateAsync: deleteBlog } = useDeleteBlogMutation();

  const { showNotification, hideNotification } = useNotification();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("blogsUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("blogsUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
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
    window.localStorage.removeItem("blogsUser");
    setUser(null);
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

  const handleLike = async (blog) => likeBlog(blog);

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog);
      showNotification({
        message: `${blog.title} by ${blog.author} removed`,
        type: "success",
      });
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
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deletable={blog.user.id === user.id}
          onLike={handleLike}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
