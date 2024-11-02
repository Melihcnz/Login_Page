import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setuserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("user_data"));
      if (storedData) {
        const { userToken, user } = storedData;
        setToken(userToken);
        setuserData(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      localStorage.removeItem("user_data");
    }
  }, []);

  const login = (newToken, newData) => {
    try {
      localStorage.setItem(
        "user_data",
        JSON.stringify({ userToken: newToken, user: newData })
      );
      setToken(newToken);
      setuserData(newData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user_data");
    setToken(null);
    setuserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
