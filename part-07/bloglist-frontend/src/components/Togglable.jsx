import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Group } from "@mantine/core";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  const showWhenVisible = { display: visible ? "" : "none", flex: 1 };
  const label = visible ? "Cancel" : props.buttonLabel;

  return (
    <Group gap="xs" align="flex-end">
      <div style={showWhenVisible}>{props.children}</div>
      <Button onClick={toggleVisibility} color={visible ? "gray" : undefined}>
        {label}
      </Button>
    </Group>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;
