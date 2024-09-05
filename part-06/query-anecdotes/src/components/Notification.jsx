import { useNotification } from "../NotificationContext";

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  const style = { border: "1px solid", padding: 10, marginBottom: 5 };

  return <div style={style}>{notification}</div>;
};

export default Notification;
