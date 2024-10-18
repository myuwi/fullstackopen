import HeartIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";

import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";

interface EntryProps<T extends Entry = Entry> {
  entry: T;
}

const icons = {
  HealthCheck: MedicalServicesIcon,
  OccupationalHealthcare: WorkIcon,
  Hospital: LocalHospitalIcon,
};

const EntryHeader = ({ entry }: EntryProps) => {
  const Icon = icons[entry.type];

  return (
    <h4>
      {entry.date}
      <Icon />
      {"employerName" in entry && entry.employerName}
    </h4>
  );
};

const HospitalEntryDetails = ({ entry }: EntryProps<HospitalEntry>) => {
  return (
    <div>
      Discharged on {entry.discharge.date}: {entry.discharge.criteria}
    </div>
  );
};

const OccupationalHealthcareEntryDetails = ({
  entry,
}: EntryProps<OccupationalHealthcareEntry>) => {
  if (!entry.sickLeave) return null;

  return (
    <div>
      Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
    </div>
  );
};

const heartColors = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red",
} as const;

const HealthCheckEntryDetails = ({ entry }: EntryProps<HealthCheckEntry>) => {
  const color = heartColors[entry.healthCheckRating];

  return (
    <div>
      <HeartIcon sx={{ color }} />
    </div>
  );
};

const EntryBody = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return null;
  }
};

interface Props {
  diagnoses: Diagnosis[];
  entry: Entry;
}

export const EntryDetails = (props: Props) => {
  const { entry, diagnoses } = props;

  return (
    <div>
      <EntryHeader entry={entry} />
      <div>{entry.description}</div>
      <EntryBody entry={entry} />

      {!!entry.diagnosisCodes?.length && (
        <>
          <div>Diagnoses:</div>
          <ul>
            {entry.diagnosisCodes.map((code) => {
              const description = diagnoses.find((d) => d.code === code)?.name;

              return (
                <li>
                  {code} {description}
                </li>
              );
            })}
          </ul>
        </>
      )}

      <div>Diagnosed by: {entry.specialist}</div>
    </div>
  );
};

export default EntryDetails;
