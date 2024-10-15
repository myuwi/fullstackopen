import { z } from "zod";
import {
  BaseEntrySchema,
  EntrySchema,
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  NewPatientSchema,
  OccupationalHealthcareEntrySchema,
  PatientSchema,
  PublicPatientSchema,
} from "./schemas";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type BaseEntry = z.infer<typeof BaseEntrySchema>;
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
export type Entry = z.infer<typeof EntrySchema>;

export type Patient = z.infer<typeof PatientSchema>;
export type NewPatient = z.infer<typeof NewPatientSchema>;
export type PublicPatient = z.infer<typeof PublicPatientSchema>;
