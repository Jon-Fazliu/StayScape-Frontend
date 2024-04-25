import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import List from "./components/pages/List";
import Hotel from "./components/pages/Hotel";
import AuthService from "./AuthService";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RegisterAffiliate from "./components/pages/RegisterAffiliate";
import Confirm from "./components/pages/Confirm";
import CoWorkingSpace from "./components/pages/CoWorkingSpace";
import TouristSpots from "./components/pages/TouristSpots";

function App() {
  return (
    <BrowserRouter>
      <AuthService>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/register/confirm" element={<Confirm />} />
          <Route path="/affiliate/register" element={<RegisterAffiliate />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/co-working-space" element={<CoWorkingSpace />} />
          <Route path="/tourist-spots" element={<TouristSpots />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AuthService>
    </BrowserRouter>
  );
}

export default App;
