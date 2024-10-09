import { FormEvent, useState } from "react";
import axios from "axios";
import diaryService from "../services/diaries";
import { NonSensitiveDiary, Weather, Visibility } from "../types";

interface FieldProps {
  name: string;
  type?: string;
}

const Field = ({ name, type = "text" }: FieldProps) => {
  return (
    <div>
      {name} <input name={name} type={type} />
    </div>
  );
};

interface RadioProps {
  name: string;
  values: string[];
}

const Radio = ({ name, values }: RadioProps) => {
  return (
    <div>
      {name}{" "}
      {values.map((value, i) => {
        return (
          <span key={value}>
            <input
              type="radio"
              id={value}
              name={name}
              value={value}
              defaultChecked={i == 0}
            />
            <label htmlFor={value}>{value}</label>
          </span>
        );
      })}
    </div>
  );
};

interface Props {
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiary[]>>;
}

const DiaryForm = ({ setDiaries }: Props) => {
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const date = formData.get("date") as string;
    const visibility = formData.get("visibility") as Visibility;
    const weather = formData.get("weather") as Weather;
    const comment = formData.get("comment") as string;

    try {
      const newDiary = await diaryService.addDiary({
        date,
        visibility,
        weather,
        comment,
      });

      setDiaries((diaries) => diaries.concat(newDiary));
      setError("");

      form.reset();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Field name="date" type="date" />
        <Radio name="visibility" values={Object.values(Visibility)} />
        <Radio name="weather" values={Object.values(Weather)} />
        <Field name="comment" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
