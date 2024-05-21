import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

async function getAllPersons() {
  return axios.get(baseUrl).then((res) => res.data);
}

async function createPerson(person) {
  return axios.post(baseUrl, person).then((res) => res.data);
}

async function deletePerson(id) {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
}

export default {
  getAll: getAllPersons,
  create: createPerson,
  delete: deletePerson,
};
