import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const notificationHideTimeout = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef(null);

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("blogsUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const hideNotification = () => {
    setNotification(null);
    notificationHideTimeout.current = null;
  };

  const showNotification = (data) => {
    // Cancel existing notification hide timeout when a new notification
    // is created so old timeout doesn't hide the new notification
    if (notificationHideTimeout.current) {
      clearTimeout(notificationHideTimeout.current);
    }

    setNotification(data);

    notificationHideTimeout.current = setTimeout(hideNotification, 5000);
  };

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

  const handleCreate = async (e) => {
    try {
      const createdBlog = await blogService.create(e);
      setBlogs(blogs.concat(createdBlog));
      showNotification({
        message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
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
        <Notification notification={notification} />
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
      <Notification notification={notification} />
      <p>
        {user.name || user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
