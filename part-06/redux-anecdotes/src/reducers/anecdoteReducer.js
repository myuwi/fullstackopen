import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "filter",
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const changedAnecdote = action.payload;
      return state.map((a) =>
        a.id === changedAnecdote.id ? changedAnecdote : a,
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(_, action) {
      return action.payload;
    },
  },
});

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState();
    const anecdoteToChange = anecdotes.find((a) => a.id === id);
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    await anecdoteService.update(id, changedAnecdote);
    dispatch(updateAnecdote(changedAnecdote));
  };
};

export default anecdoteSlice.reducer;
