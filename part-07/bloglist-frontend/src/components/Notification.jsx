import { Alert } from "@mantine/core";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  const alertProps =
    notification.type === "error"
      ? { icon: <IconAlertCircle />, color: "red" }
      : { icon: <IconCircleCheck />, color: "green" };

  return <Alert {...alertProps}>{notification.message}</Alert>;
};

Notification.propTypes = {
  notification: PropTypes.exact({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default Notification;
