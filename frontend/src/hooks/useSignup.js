import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const url = "api/users/signup";

  const signup = async ({ email, password }) => {
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

    sessionStorage.setItem("user", JSON.stringify(user.email));
    sessionStorage.setItem("token", JSON.stringify(user.token));
    console.log("User signed up successfully");
    setIsLoading(false);
    navigate("/");
  };
  return { signup, isLoading, error };
};
export default useSignup;


/*
export default function useSignup (url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const signup = async (object) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(object),
        });
        const user = await response.json();
    
        if (!response.ok) {
            console.log(user.error);
          setError(user.error);
          setIsLoading(false);
          return error;
        }
    
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
      };

      return { signup, isLoading, error };
};
*/
