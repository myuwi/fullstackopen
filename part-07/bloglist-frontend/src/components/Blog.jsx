import React from "react";
import { useMatch, useNavigate } from "react-router-dom";

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
      <h3>comments</h3>
      <CommentForm onSubmit={handleComment} />
      <ul>
        {blog.comments.map((comment, i) => {
          return <li key={i}>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default BlogPage;
