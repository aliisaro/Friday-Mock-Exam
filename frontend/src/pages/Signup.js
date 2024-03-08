import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");

  const { signup, error } = useSignup(setIsAuthenticated);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signup({ email: email.value, password: password.value });
    if (!error) {
      console.log("success");
      navigate("/");
    }
    console.log("Login Error from pages");
  };

  return (
    <>
      <form className="signup" onSubmit={handleFormSubmit}>
        <h3>Sign Up</h3>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button>Sign up</button>
      </form>
    </>
  );
};

export default Signup;
