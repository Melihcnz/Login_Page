import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext";

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      
      if (res.status === 200) {
        message.success(data.message || "Login successful");
        login(data.token, data.user);
      } else if (res.status === 404) {
        setError(data.message || "User not found");
        message.error(data.message || "User not found");
      } else if (res.status === 400) {
        setError(data.message || "Invalid credentials");
        message.error(data.message || "Invalid credentials");
      } else {
        message.error("Login failed");
        setError("Login failed");
      }
    } catch (error) {
      message.error("An error occurred during login");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
