import express, { Response } from "express";
import patientService from "../services/patientService";
import { NewPatientSchema, PublicPatient } from "../types";

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
      err instanceof Error ? err.message : "Something went wrong.";
    res.status(400).json({ message });
  }
});

export default router;
