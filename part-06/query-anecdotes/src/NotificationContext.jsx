import { createContext, useContext, useReducer, useRef } from "react";

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
  const [notification, dispatch] = useReducer(notificationReducer, "");

  const timeout = useRef(null);
  const showNotification = (content) => {
    clearTimeout(timeout.current);
    dispatch({ type: "SET_NOTIFICATION", payload: content });

    timeout.current = setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
