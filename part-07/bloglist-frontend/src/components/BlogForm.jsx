import { useState } from "react";
import { Button, Group, TextInput } from "@mantine/core";
import PropTypes from "prop-types";

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreate({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group align="flex-end" justify="stretch">
        <TextInput
          flex={1}
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          flex={1}
          placeholder="Enter author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextInput
          flex={1}
          placeholder="Enter url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};

export default BlogForm;
