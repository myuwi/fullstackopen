import { useEffect, useState } from "react";
import Diaries from "./components/Diaries";
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
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
