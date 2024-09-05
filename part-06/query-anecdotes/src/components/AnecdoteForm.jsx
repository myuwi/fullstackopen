import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotification } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      showNotification(`anecdote '${newAnecdote.content}' added`);
    },
  });

  const onCreate = (ev) => {
    ev.preventDefault();
    const content = ev.target.anecdote.value;
    ev.target.anecdote.value = "";
    createAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
