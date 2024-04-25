import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useAuth } from "../../AuthService";

const RegisterAffiliate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const auth = useAuth();

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  const register = () => {
    auth.registerAffiliate({
      email: email,
      password: password,
      name: name,
      phoneNumber: phone,
      website: website,
      address: {
        street: street,
        streetNumber: streetNumber,
        city: city,
        postalCode: postalCode,
        country: country,
      },
    });
  };

  return (
    <div className="register">
      <h2>Join as affiliate</h2>
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
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>Website:</label>
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label>Street:</label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div>
        <label>Street Number:</label>
        <input
          type="text"
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <button onClick={register}>Register</button>
      <button onClick={redirectToLogin}>Already have an account? Log in</button>
      <button onClick={redirectToRegister}>
        Wish to create a user account? Register here
      </button>
    </div>
  );
};

export default RegisterAffiliate;
