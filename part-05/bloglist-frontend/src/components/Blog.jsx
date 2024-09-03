import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, deletable, onLike, onDelete }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const label = open ? "hide" : "view";

  const handleLike = () => onLike(blog);
  const handleDelete = () => onDelete(blog);

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author} <button onClick={toggleOpen}>{label}</button>
      </div>
      {open && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name || blog.user.username}</div>
          {deletable && <button onClick={handleDelete}>remove</button>}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deletable: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blog;
