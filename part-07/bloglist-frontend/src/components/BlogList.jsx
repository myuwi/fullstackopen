import { Link } from "react-router-dom";
import { useBlogsQuery } from "../queries/blogs";

const BlogList = () => {
  const { data: blogs = [] } = useBlogsQuery();
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <div className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
