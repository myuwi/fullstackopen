import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import patientService from "../../services/patients";
import { Diagnosis, Gender, Patient } from "../../types";
import EntryDetails from "./EntryDetails";

interface GenderIconProps {
  gender: Gender;
}

const GenderIcon = ({ gender }: GenderIconProps) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    default:
      return null;
  }
};

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const match = useMatch("/patients/:id");
  const id = match?.params.id;

  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const data = await patientService.get(id);
        setPatient(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchPatient(id);
    }
  }, [id]);

  if (!patient) return null;

  return (
    <div>
      <h2>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map((entry) => {
        return (
          <EntryDetails key={entry.id} diagnoses={diagnoses} entry={entry} />
        );
      })}
    </div>
  );
};

export default PatientPage;
