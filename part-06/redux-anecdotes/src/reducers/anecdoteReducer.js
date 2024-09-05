import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "filter",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload];
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((a) => (a.id === id ? changedAnecdote : a));
    },
    setAnecdotes(_, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
