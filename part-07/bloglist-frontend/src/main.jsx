import ReactDOM from "react-dom/client";
import { NotificationProvider } from "./contexts/NotificationContext";
import App from "./App";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>,
);
