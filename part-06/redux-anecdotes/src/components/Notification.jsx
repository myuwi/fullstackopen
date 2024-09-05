import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return <div className="notification">{notification}</div>;
};

export default Notification;
