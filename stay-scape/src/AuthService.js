import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthService = ({ children }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("login_token", data.token);
        setAuthenticated(true);
        setUser(data.user);
        navigate("/dashboard");
      } else {
        console.error("Error during login:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const register = () => {};

  const logout = () => {
    localStorage.removeItem("login_token");
    setAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const getAuthenticated = () => authenticated;

  return (
    <AuthContext.Provider
      value={{ getAuthenticated, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthService;
