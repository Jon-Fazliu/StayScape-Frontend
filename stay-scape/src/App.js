import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import List from "./components/pages/List";
import Hotel from "./components/pages/Hotel";
import AuthService from "./AuthService";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthService>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AuthService>
    </BrowserRouter>
  );
}

export default App;
