import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import BirthYearForm from "./BirthYearForm";

const Authors = () => {
  const { loading, data } = useQuery(ALL_AUTHORS);
  const authors = data?.allAuthors ?? [];

  if (loading) return <div>loading...</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm />
    </div>
  );
};

export default Authors;
