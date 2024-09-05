import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();
    const filterFn = (anecdote) =>
      anecdote.content.toLowerCase().includes(filter);

    return state.anecdotes.filter(filterFn);
  });
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();

  const handleVote = (id) => dispatch(voteAnecdote(id));

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
