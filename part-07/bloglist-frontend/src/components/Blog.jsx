import React from "react";
import { useMatch, useNavigate } from "react-router-dom";

import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";
import {
  useBlogsQuery,
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

  const { mutateAsync: likeBlog } = useLikeBlogMutation();
  const { mutateAsync: deleteBlog } = useDeleteBlogMutation();

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleLike = async () => likeBlog(blog);

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
    <div>
      <h2>{blog.title}</h2>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={handleLike}>like</button>
        </div>
        <div>added by {blog.user.name || blog.user.username}</div>
        {deletable && <button onClick={handleDelete}>remove</button>}
      </div>
    </div>
  );
};

export default BlogPage;
