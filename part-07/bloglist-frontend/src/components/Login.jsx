import {
  Button,
  Center,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import Notification from "./Notification";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { showNotification, hideNotification } = useNotification();
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      hideNotification();
      setUsername("");
      setPassword("");
    } catch (err) {
      showNotification({
        message: "Wrong username or password",
        type: "error",
      });
    }
  };

  return (
    <Center mih="100vh">
      <Stack miw={360}>
        <Title order={2}>Log in</Title>
        <Notification />
        <form onSubmit={handleLogin}>
          <Stack>
            <TextInput
              label="Username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              withAsterisk
            />
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              withAsterisk
            />
            <Button type="submit">Log in</Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
};

export default Login;
