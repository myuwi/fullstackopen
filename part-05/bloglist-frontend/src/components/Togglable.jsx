import { forwardRef, useImperativeHandle, useState } from "react";

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

export default Togglable;
