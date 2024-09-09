import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Anchor,
  Avatar,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { hideNotification } = useNotification();
  const { user, logout } = useUser();

  const handleProfile = () => navigate(`/users/${user.id}`);

  const handleLogout = () => {
    logout();
    hideNotification();
  };

  return (
    <Group component="nav" justify="space-between" h="4rem">
      <Group>
        <Anchor component={Link} to="/">
          Blogs
        </Anchor>
        <Anchor component={Link} to="/users">
          Users
        </Anchor>
      </Group>
      {user && (
        <Menu shadow="sm" width={200}>
          <Menu.Target>
            <UnstyledButton>
              <Group gap="xs">
                <Text size="sm">Logged in as {user.name}</Text>
                <Avatar color="blue" name={user.name} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconUser size={14} />}
              onClick={handleProfile}
            >
              Profile
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Account</Menu.Label>
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={14} />}
              onClick={handleLogout}
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </Group>
  );
};

export default Navbar;
