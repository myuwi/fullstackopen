import { CoursePart } from "../types";
import Part from "./Part";

interface Props {
  parts: CoursePart[];
}

const Content = ({ parts }: Props) => {
  return (
    <>
      {parts.map((part) => {
        return <Part key={part.name} part={part} />;
      })}
    </>
  );
};

export default Content;
