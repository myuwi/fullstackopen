import { CoursePart } from "../types";

interface Props {
  parts: CoursePart[];
}

const Total = ({ parts }: Props) => {
  const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return <p>Number of exercises {total}</p>;
};

export default Total;
