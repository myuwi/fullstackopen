const ratings = [
  "are you even trying?",
  "not too bad but could be better",
  "goal reached, great job!",
];

const calculateExercises = (exercises: number[], target: number) => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((h) => h > 0).length;
  const totalHours = exercises.reduce((a, b) => a + b);
  const average = totalHours / periodLength;
  const success = average >= target;

  const rating = average >= target ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription = ratings[rating - 1];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 3));
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1));
