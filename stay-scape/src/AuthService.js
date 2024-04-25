import React, { createContext, useContext, useState, useEffect } from "react";
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
        localStorage.setItem("refresh_token", data.refreshToken);
        localStorage.setItem("role", data.user.role);
        setAuthenticated(true);
        setUser(data.user);
        navigate("/home");
      } else {
        console.error("Error during login:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/home");
      } else {
        console.error("Error during register:", data.message);
      }
    } catch (error) {
      console.error("Error during register:", error);
    }
  };

  const confirm = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register/confirm?token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Successfully confirmed account!");
        navigate("/login");
      } else {
        console.error("Error during confirm:", data.message);
      }
    } catch (error) {
      console.error("Error during confirm:", error);
    }
  };

  const registerAffiliate = async (userData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/affiliate/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/home");
      } else {
        console.error("Error during register:", data.message);
      }
    } catch (error) {
      console.error("Error during register:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("login_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    setAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const getAuthenticated = () => authenticated;

  const getUser = () => user;

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/refresh`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("login_token", data.token);
          setAuthenticated(true);
          setUser(data.user);
        } else {
          console.error("Error refreshing access token:", data.message);
          logout();
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
        logout();
      }
    };

    const intervalId = setInterval(refreshAccessToken, 5 * 60 * 1000); // Call refreshAccessToken every 5 minutes

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getAuthenticated,
        getUser,
        login,
        logout,
        register,
        registerAffiliate,
        confirm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthService;
