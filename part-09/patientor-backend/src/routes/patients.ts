import express, { Response } from "express";
import patientService from "../services/patientService";
import { PublicPatient } from "../types";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<PublicPatient[]>) => {
  res.json(patientService.getPublicPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const patient = patientService.addPatient(newPatient);

    res.status(201).json(patient);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong.";
    res.status(400).json({ message });
  }
});

export default router;
