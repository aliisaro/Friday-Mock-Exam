import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const email = useField("email");
  const password = useField("password");

  const { signup, isLoading, error } = useSignup("/api/users/signup");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signup({ email: email.value, password: password.value });
    if (!error) console.log("success");
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