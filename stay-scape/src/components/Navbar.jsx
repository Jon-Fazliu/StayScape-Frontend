import { useAuth } from "../AuthService";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const auth = useAuth();
  const authenticated = localStorage.getItem("login_token") ? true : false;

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    auth.logout();
    navigate("/home");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo"> Stayscape </span>
        <div className="navItems">
          {!authenticated && (
            <>
              <button className="navButton" onClick={handleRegisterClick}>
                Register
              </button>
              <button className="navButton" onClick={handleLoginClick}>
                Login
              </button>
            </>
          )}
          {authenticated && (
            <button className="navButton" onClick={handleLogoutClick}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
