import axios from "axios";
const baseUrl = "/api/users";

const getAllUsers = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export default {
  getAll: getAllUsers,
};
