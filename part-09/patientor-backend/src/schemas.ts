import { z } from "zod";
import { Gender, HealthCheckRating } from "./types";

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

export const PatientSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, { message: "Required" }),
  dateOfBirth: z.string().date(),
  ssn: z.string().trim().min(1, { message: "Required" }),
  gender: z.nativeEnum(Gender),
  occupation: z.string().trim().min(1, { message: "Required" }),
  entries: z.array(EntrySchema).default([]),
});

export const NewPatientSchema = PatientSchema.omit({ id: true });
export const PublicPatientSchema = PatientSchema.omit({
  ssn: true,
  entries: true,
});
