const dummy = (_blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return undefined;
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
};

export default {
  dummy,
  totalLikes,
  favoriteBlog,
};
