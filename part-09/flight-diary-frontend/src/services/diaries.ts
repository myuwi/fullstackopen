import axios from "axios";
import { Diary, NewDiary, NonSensitiveDiary } from "../types";

const baseUrl = "http://localhost:3000/api";

const getDiaries = async (): Promise<NonSensitiveDiary[]> =>
  axios.get(`${baseUrl}/diaries`).then((res) => res.data);

const addDiary = async (diary: NewDiary): Promise<Diary> =>
  axios.post(`${baseUrl}/diaries`, diary).then((res) => res.data);

export default {
  getDiaries,
  addDiary,
};
