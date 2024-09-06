import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  const showWhenVisible = { display: visible ? "" : "none" };
  const label = visible ? "cancel" : props.buttonLabel;

  return (
    <div>
      <div style={showWhenVisible}>{props.children}</div>
      <button onClick={toggleVisibility}>{label}</button>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;
