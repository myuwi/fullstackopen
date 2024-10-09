import axios from "axios";

const baseUrl = "http://localhost:3000/api";

const getDiaries = async () =>
  axios.get(`${baseUrl}/diaries`).then((res) => res.data);

export default {
  getDiaries,
};
