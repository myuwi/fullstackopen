import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllBlogs = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createBlog = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const commentBlog = async (id, comment) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config);
  return res.data;
};

const updateBlog = async (id, updatedBlog) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  return res.data;
};

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default {
  setToken,
  getAll: getAllBlogs,
  create: createBlog,
  comment: commentBlog,
  update: updateBlog,
  delete: deleteBlog,
};
