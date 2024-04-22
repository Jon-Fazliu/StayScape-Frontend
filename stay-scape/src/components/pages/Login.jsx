import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useAuth } from "../../AuthService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const auth = useAuth();

  const handleLogin = () => {
    auth.login(email, password);
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={redirectToRegister}>
        Don't have an account? Register
      </button>
    </div>
  );
};

export default Login;
