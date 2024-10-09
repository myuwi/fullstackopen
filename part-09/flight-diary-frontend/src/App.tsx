import { useEffect, useState } from "react";
import Diaries from "./components/Diaries";
import DiaryForm from "./components/DiaryForm";
import diaryService from "./services/diaries";
import { NonSensitiveDiary } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiary[]>([]);

  const fetchDiaries = async () => {
    const diaries = await diaryService.getDiaries();
    setDiaries(diaries);
  };

  useEffect(() => {
    void fetchDiaries();
  }, []);

  return (
    <div>
      <DiaryForm setDiaries={setDiaries} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
