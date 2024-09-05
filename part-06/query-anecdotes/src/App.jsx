import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotification } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const {
    data: anecdotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      showNotification(`anecdote '${anecdote.content}' voted`);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
