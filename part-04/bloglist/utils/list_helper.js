const dummy = (_blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

export default {
  dummy,
  totalLikes,
};
