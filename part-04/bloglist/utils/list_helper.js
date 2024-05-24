const dummy = (_blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return undefined;
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return undefined;

  const authors = {};
  let mostBlogsAuthorName;

  blogs.forEach((blog) => {
    const authorName = blog.author;
    let authorBlogs = authors[authorName] || 0;
    authors[authorName] = ++authorBlogs;

    const mostBlogs = authors[mostBlogsAuthorName] || 0;
    if (authorBlogs > mostBlogs) {
      mostBlogsAuthorName = authorName;
    }
  });

  return {
    author: mostBlogsAuthorName,
    blogs: authors[mostBlogsAuthorName],
  };
};

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
