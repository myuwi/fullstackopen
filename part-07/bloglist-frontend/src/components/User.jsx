import React from "react";
import { useMatch } from "react-router-dom";
import { Avatar, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useUsersQuery } from "../queries/users";
import BlogList from "./BlogList";

const User = () => {
  const { data: users = [] } = useUsersQuery();
  const match = useMatch("/users/:id");
  const id = match?.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) return null;

  return (
    <Group gap="xl" align="flex-start">
      <Paper withBorder p="xl" miw={200}>
        <Avatar color="blue" name={user.name} size="xl" mx="auto" mb="sm" />
        <Text ta="center">{user.name}</Text>
        <Text ta="center" c="dimmed" size="sm">
          @{user.username}
        </Text>
      </Paper>
      <Stack flex="1">
        <Title order={3}>Submitted blogs</Title>
        <BlogList />
      </Stack>
    </Group>
  );
};

export default User;
