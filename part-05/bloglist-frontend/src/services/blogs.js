import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const update = async (id, updatedBlog) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  return res.data;
};

export default { setToken, getAll, create, update };
