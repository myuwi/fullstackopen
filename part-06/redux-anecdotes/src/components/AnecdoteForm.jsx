import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdotes";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreate = async (ev) => {
    ev.preventDefault();
    const content = ev.target.anecdote.value;
    ev.target.anecdote.value = "";
    const anecdote = await anecdoteService.create(content);
    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(`you created '${content}'`));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
