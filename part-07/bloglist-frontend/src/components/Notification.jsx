import PropTypes from "prop-types";
import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div className={`notification notification-${notification.type}`}>
      {notification.message}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.exact({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default Notification;
