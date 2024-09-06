import { createContext, useContext, useReducer, useRef } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  const timeout = useRef(null);

  const showNotification = (content) => {
    clearTimeout(timeout.current);
    dispatch({ type: "SET_NOTIFICATION", payload: content });

    timeout.current = setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  const hideNotification = () => {
    clearTimeout(timeout.current);
    dispatch({ type: "CLEAR_NOTIFICATION" });
  };

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotification = () => useContext(NotificationContext);
