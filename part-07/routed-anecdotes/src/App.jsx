import { useEffect, useState } from "react";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";

import About from "./components/About";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

const initialAnecdotes = [
  {
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: 1,
  },
  {
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    info: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: 2,
  },
];

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);

  const match = useMatch("/anecdotes/:id");
  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);
  const anecdote = match ? anecdoteById(Number(match.params.id)) : null;

  const navigate = useNavigate();

  const [notification, setNotification] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [notification]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate("/");
    setNotification(`a new anecdote ${anecdote.content} added!`);
  };

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {!!notification && <Notification content={notification} />}
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
