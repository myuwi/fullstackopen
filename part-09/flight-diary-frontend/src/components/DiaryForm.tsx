import { FormEvent, useState } from "react";
import axios from "axios";
import diaryService from "../services/diaries";
import { NonSensitiveDiary } from "../types";

interface FieldProps {
  name: string;
}

const Field = ({ name }: FieldProps) => {
  return (
    <div>
      {name} <input name={name} type="text" />
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
    const visibility = formData.get("visibility") as string;
    const weather = formData.get("weather") as string;
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
        <Field name="date" />
        <Field name="visibility" />
        <Field name="weather" />
        <Field name="comment" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
