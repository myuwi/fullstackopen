import React, { useState } from "react";
import { Button, Group, Stack, Textarea } from "@mantine/core";
import PropTypes from "prop-types";

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="xs">
        <Textarea
          aria-label="Comment"
          name="Comment"
          type="text"
          placeholder="Write a comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Group justify="flex-end">
          <Button type="submit">Comment</Button>
        </Group>
      </Stack>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
