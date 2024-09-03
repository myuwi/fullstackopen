import { useState } from "react";

const Blog = ({ blog }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const label = open ? "hide" : "view";

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author} <button onClick={toggleOpen}>{label}</button>
      </div>
      {open && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.name || blog.user.username}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
