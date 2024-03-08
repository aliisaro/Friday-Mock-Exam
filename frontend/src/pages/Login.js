import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");

  const { login, isLoading, error } = useLogin("/api/users/login");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login({ email: email.value, password: password.value });
    if (!error) {
      console.log("success");
      navigate("/");
    }
  };

  return (
    <>
      <form className="signup" onSubmit={handleFormSubmit}>
        <h3>Login</h3>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
