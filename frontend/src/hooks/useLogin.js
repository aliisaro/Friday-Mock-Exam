/*import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
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

    sessionStorage.setItem("user", JSON.stringify(user));
    console.log("User log up successfully");
    setIsLoading(false);
    navigate("/");
  };
  return { login, isLoading, error };
};
export default useLogin;
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const login = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      setIsLoading(false);
      return error;
    }

    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user.email));
    setIsLoading(false);
  };

  return { login, isLoading, error };
}
