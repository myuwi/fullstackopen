import { CoursePart } from "../types";

interface Props {
  part: CoursePart;
}

const Part = ({ part }: Props) => {
  return (
    <div style={{ marginBlock: "1rem" }}>
      <b>
        {part.name} {part.exerciseCount}
      </b>
      <PartBody part={part} />
    </div>
  );
};

const PartBody = ({ part }: Props) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );
    case "group":
      return <div>project exercises {part.groupProjectCount}</div>;
    case "background":
      return (
        <div>
          <i>{part.description}</i>
          <div>background material: {part.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <i>{part.description}</i>
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
  }
};

export default Part;
