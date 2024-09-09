import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

export const useBlogsQuery = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
};

export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });
};

export const useCommentBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId, comment }) => {
      return blogService.comment(blogId, comment);
    },
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });
};

export const useLikeBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blog) => {
      return blogService.update(blog.id, { ...blog, likes: blog.likes + 1 });
    },
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });
};

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blog) => {
      await blogService.delete(blog.id);
      return blog;
    },
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.filter((b) => b.id !== deletedBlog.id);
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });
};
