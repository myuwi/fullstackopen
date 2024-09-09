import React from "react";
import { Link } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";

const Navbar = () => {
  const { hideNotification } = useNotification();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    hideNotification();
  };

  return (
    <nav className="navbar">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user && (
        <>
          {user.name || user.username} logged in
          <button onClick={handleLogout}>logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
