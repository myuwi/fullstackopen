import express, { Response } from "express";
import patientService from "../services/patientService";
import { Patient, PublicPatient } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<PublicPatient[]>) => {
  res.json(patientService.getPublicPatients());
});

router.post("/", (req, res: Response<Patient>) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body as Record<
    string,
    string
  >;

  const patient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.status(201).json(patient);
});

export default router;
