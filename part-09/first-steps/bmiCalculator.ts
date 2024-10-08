export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 16) return "Underweight (Severe thinness)";
  else if (bmi < 17) return "Underweight (Moderate thinness)";
  else if (bmi < 18.5) return "Underweight (Mild thinness)";
  else if (bmi < 25) return "Normal range";
  else if (bmi < 30) return "Overweight (Pre-obese)";
  else if (bmi < 35) return "Obese (Class I)";
  else if (bmi < 40) return "Obese (Class II)";
  else return "Obese (Class III)";
};

if (require.main === module) {
  interface Args {
    height: number;
    weight: number;
  }

  const parseArgs = (args: string[]): Args => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (!isNaN(height) && !isNaN(weight)) {
      return {
        height,
        weight,
      };
    } else {
      throw new Error("Provided values were not numbers!");
    }
  };

  try {
    const { height, weight } = parseArgs(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : error;
    console.log("Something went wrong:", message);
  }
}
