import { Stack, Table, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useUsersQuery } from "../queries/users";

const Users = () => {
  const { data: users = [] } = useUsersQuery();
  const navigate = useNavigate();

  return (
    <Stack>
      <Title order={2}>Users</Title>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Blogs created</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user) => {
            return (
              <Table.Tr
                style={{ cursor: "pointer" }}
                key={user.username}
                onClick={() => navigate(`/users/${user.id}`)}
              >
                <Table.Td>{user.name}</Table.Td>
                <Table.Td>{user.username}</Table.Td>
                <Table.Td>{user.blogs.length}</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Stack>
  );
};

export default Users;
