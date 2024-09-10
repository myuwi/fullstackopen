import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const BirthYearForm = () => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get("name");
    const born = formData.get("born");

    const result = await editAuthor({
      variables: {
        name,
        setBornTo: parseInt(born),
      },
    });

    if (!result.data?.editAuthor) {
      return console.log("Author not found");
    }

    form.reset();
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name <input name="name" type="text" />
        </div>
        <div>
          born <input name="born" type="text" />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
