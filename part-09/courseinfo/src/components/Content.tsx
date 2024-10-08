import { CoursePart } from "../types";

interface Props {
  parts: CoursePart[];
}

const Content = ({ parts }: Props) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <p>
            {part.name} {part.exerciseCount}
          </p>
        );
      })}
    </>
  );
};

export default Content;
