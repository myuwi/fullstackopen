import React from "react";
import { useMatch } from "react-router-dom";
import { useUsersQuery } from "../queries/users";

const User = () => {
  const { data: users = [] } = useUsersQuery();
  const match = useMatch("/users/:id");
  const id = match?.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) return null;

  return (
    <div>
      <h2>{user.name || user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
