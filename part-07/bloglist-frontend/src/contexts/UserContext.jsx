import { createContext, useContext, useLayoutEffect, useReducer } from "react";
import PropTypes from "prop-types";

import blogService from "../services/blogs";
import loginService from "../services/login";

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.payload;
    case "LOG_OUT":
      return null;
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  const login = async (username, password) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("blogsUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({ type: "LOG_IN", payload: user });
  };

  const logout = () => {
    window.localStorage.removeItem("blogsUser");
    blogService.setToken(null);
    dispatch({ type: "LOG_OUT" });
  };

  useLayoutEffect(() => {
    const storedUser = window.localStorage.getItem("blogsUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      blogService.setToken(user.token);
      dispatch({ type: "LOG_IN", payload: user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);
