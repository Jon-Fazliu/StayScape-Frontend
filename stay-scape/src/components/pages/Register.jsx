import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useAuth } from "../../AuthService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const auth = useAuth();

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <h2>Register</h2>
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
      <button onClick={auth.register()}>Register</button>
      <button onClick={redirectToLogin}>Already have an account? Log in</button>
    </div>
  );
};

export default Register;
