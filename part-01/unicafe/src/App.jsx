import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => setGood(good + 1);
  const handleClickNeutral = () => setNeutral(neutral + 1);
  const handleClickBad = () => setBad(bad + 1);

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={handleClickGood}>good</button>
        <button onClick={handleClickNeutral}>neutral</button>
        <button onClick={handleClickBad}>bad</button>
      </div>
      <h2>statistics</h2>
      <div>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
      </div>
    </div>
  );
};

export default App;
