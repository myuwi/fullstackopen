import "@mantine/core/styles.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "./contexts/NotificationContext";
import { UserProvider } from "./contexts/UserContext";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotificationProvider>
          <Router>
            <App />
          </Router>
        </NotificationProvider>
      </UserProvider>
    </QueryClientProvider>
  </MantineProvider>,
);
