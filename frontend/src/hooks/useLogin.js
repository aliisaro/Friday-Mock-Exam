import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = ({isAuthenticated, setIsAuthenticated}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const url = "api/users/login";

  const login = async ({ email, password }) => {
    console.log(email, password);
    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const user = await response.json();
    if (!response.ok) {
      setError(user.message);
      setIsLoading(false);
      return error;
    };

    localStorage.setItem("user", JSON.stringify(user.email));
    localStorage.setItem("token", JSON.stringify(user.token));
    console.log("User logged in successfully");
    setIsAuthenticated(true);
    setIsLoading(false);
    navigate("/");
  };
  return { login, isLoading, error };
};
export default useLogin;
