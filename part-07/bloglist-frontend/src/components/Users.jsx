import React from "react";
import { Link } from "react-router-dom";
import { useUsersQuery } from "../queries/users";

const Users = () => {
  const { data: users = [] } = useUsersQuery();

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user.id}`}>
                    {user.name || user.username}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
