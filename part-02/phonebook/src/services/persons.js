import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = async (person) => {
  return axios.post(baseUrl, person).then((res) => res.data);
};

export default {
  getAll,
  create,
};
