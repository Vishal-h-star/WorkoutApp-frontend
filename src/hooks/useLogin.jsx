import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const { dispatch } = useAuthContext();
 const API = import.meta.env.VITE_API_BASE_URL;

  const login = async ({ email, password }) => {
    setError(null);
    setisLoading(true);

    const response = await fetch(`${API}/api/user/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email , password }),
    });

    const json =  await response.json();

    if (!response.ok) {
      setisLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      //  global auth context
      dispatch({ type: "LOGIN", payload: json });
      setisLoading(false);
    }
  };

  return { login, isLoading, error };
};
