import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ setToken }) => {
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const username = formData.get("username");
    const password = formData.get("password");

    const result = await login({ variables: { username, password } });

    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      window.localStorage.setItem("library-user-token", token);
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username <input name="username" type="text" />
        </div>
        <div>
          password <input name="password" type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
