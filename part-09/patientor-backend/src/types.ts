import { z } from "zod";

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
export const GenderSchema = z.nativeEnum(Gender);

export const EntrySchema = z.object({});
export type Entry = z.infer<typeof EntrySchema>;

export const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: GenderSchema,
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

export const NewPatientSchema = PatientSchema.omit({ id: true });
export const PublicPatientSchema = PatientSchema.omit({
  ssn: true,
  entries: true,
});

export type Patient = z.infer<typeof PatientSchema>;
export type NewPatient = z.infer<typeof NewPatientSchema>;
export type PublicPatient = z.infer<typeof PublicPatientSchema>;
