import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotificationContent(_, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const { setNotificationContent, clearNotification } =
  notificationSlice.actions;

let timeout = null;
export const setNotification = (content, duration) => {
  return (dispatch) => {
    clearTimeout(timeout);
    dispatch(setNotificationContent(content));

    timeout = setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;
