import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { BOOK_ADDED } from "./queries";

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(
    window.localStorage.getItem("library-user-token"),
  );

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const { title } = data.data.bookAdded;
      window.alert(`Book added ${title}`);
    },
  });

  const handleLogout = () => {
    setToken(null);
    window.localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <nav>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        {token ? (
          <>
            <Link to="/recommended">recommended</Link>
            <Link to="/add">add book</Link>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
