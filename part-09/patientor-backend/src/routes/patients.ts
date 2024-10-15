import express, { Response } from "express";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../schemas";
import { PublicPatient } from "../types";
import { ZodError } from "zod";
import { prettyZodError } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<PublicPatient[]>) => {
  res.json(patientService.getPublicPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (!patient) {
    res.sendStatus(404);
    return;
  }
  res.json(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const patient = patientService.addPatient(newPatient);

    res.status(201).json(patient);
  } catch (err) {
    const message =
      err instanceof ZodError ? prettyZodError(err) : "Something went wrong.";
    res.status(400).send(message);
  }
});

export default router;
