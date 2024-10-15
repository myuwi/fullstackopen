import { v4 as uuid } from "uuid";
import patients from "../data/patients";
import { NewPatient, Patient, PublicPatient } from "../types";

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, gender, occupation, dateOfBirth }) => ({
    id,
    name,
    gender,
    occupation,
    dateOfBirth,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPublicPatients,
  getPatient,
  addPatient,
};
