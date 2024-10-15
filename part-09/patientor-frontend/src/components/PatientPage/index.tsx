import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

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

import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";

const PatientPage = () => {
  const match = useMatch("/patients/:id");
  const id = match?.params.id;

  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const fetchPatient = async (id: string) => {
    try {
      const data = await patientService.get(id);
      setPatient(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes?.map((code) => {
                return <li key={code}>{code}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PatientPage;
