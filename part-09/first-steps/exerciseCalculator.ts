const ratings = [
  "are you even trying?",
  "not too bad but could be better",
  "goal reached, great job!",
];

export const calculateExercises = (target: number, exercises: number[]) => {
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

if (require.main === module) {
  interface Args {
    target: number;
    exercises: number[];
  }

  const parseArgs = (args: string[]): Args => {
    if (args.length < 4) throw new Error("Not enough arguments");

    const [target, ...exercises] = args.slice(2).map((num) => {
      const parsed = Number(num);
      if (isNaN(parsed)) {
        throw new Error("Provided values were not numbers!");
      }
      return parsed;
    });

    return {
      target,
      exercises,
    };
  };

  try {
    const { target, exercises } = parseArgs(process.argv);
    console.log(calculateExercises(target, exercises));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : error;
    console.log("Something went wrong:", message);
  }
}
