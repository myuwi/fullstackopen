import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNumber } from "./utils";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({
      error: "malformatted parameters",
    });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as Record<string, unknown>;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).send({
      error: "parameters missing",
    });
    return;
  }

  const valid =
    isNumber(target) &&
    Array.isArray(daily_exercises) &&
    daily_exercises.every(isNumber);

  if (!valid) {
    res.status(400).send({
      error: "malformatted parameters",
    });
    return;
  }

  res.json(calculateExercises(target, daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
