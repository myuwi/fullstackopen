import { NonSensitiveDiary } from "../types";

interface Props {
  diaries: NonSensitiveDiary[];
}

const Diaries = ({ diaries }: Props) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(({ id, date, visibility, weather }) => {
        return (
          <div key={id}>
            <h3>{date}</h3>
            <div>visibility: {visibility}</div>
            <div>weather: {weather}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Diaries;
