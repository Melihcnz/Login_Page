import { useState } from "react"; // useState'i buradan içe aktarıyoruz
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext";

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError(null);
      setLoading(true); // Yükleme durumunu true yapıyoruz
      const res = await fetch("http://localhost:3002/api/auth/signup", { // URL düzeltildi
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.status === 201) {
        message.success(data.message);
        login(data.token, data.user); // token için düzeltildi
      } else if (res.status === 400) { // 400 durum kodu düzeltildi
        setError(data.message);
      } else {
        message.error("Registration failed");
      }
    } catch (error) {
      message.error("An error occurred during registration");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
};

export default useSignup;
