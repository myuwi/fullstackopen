import patients from "../data/patients";
import { PublicPatient } from "../types";

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, gender, occupation, dateOfBirth }) => ({
    id,
    name,
    gender,
    occupation,
    dateOfBirth,
  }));
};

export default {
  getPublicPatients,
};
