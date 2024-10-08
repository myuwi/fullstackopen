import { Gender, NewPatient } from "./types";

const isString = (v: unknown): v is string => typeof v === "string";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (v: unknown): v is Record<any, unknown> => {
  return typeof v === "object" && v !== null;
};

const isDate = (v: string): boolean => Boolean(Date.parse(v));

const isGender = (v: string): v is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(v);
};

const parseString = (v: unknown, field: string): string => {
  if (!isString(v)) {
    throw new Error(`Expected field '${field}' to be a string`);
  }
  return v;
};

const parseDate = (v: unknown, field: string): string => {
  if (!isString(v) || !isDate(v)) {
    throw new Error(
      `Expected field '${field}' to be a valid string representation of a date`,
    );
  }
  return v;
};

const parseGender = (v: unknown, field: string): Gender => {
  if (!isString(v) || !isGender(v)) {
    throw new Error(
      `Expected field '${field}' to be one of: ${Object.values(Gender)
        .map((gender) => `'${gender}'`)
        .join(", ")}`,
    );
  }
  return v;
};

export const toNewPatient = (obj: unknown): NewPatient => {
  if (!isObject(obj)) {
    throw new Error("Expected patient to be a JSON object");
  }

  return {
    name: parseString(obj.name, "name"),
    dateOfBirth: parseDate(obj.dateOfBirth, "dateOfBirth"),
    ssn: parseString(obj.ssn, "ssn"),
    gender: parseGender(obj.gender, "gender"),
    occupation: parseString(obj.occupation, "occupation"),
  };
};
