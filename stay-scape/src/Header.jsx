import Navbar from "./Navbar";

import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <span> Stays</span>
          </div>
          <div className="headerListItem active">
          <span> Hotels</span>
          </div>
        </div>

<h1 className="headerTitle">Discover Endless Adventures - Book Your Stay Today!</h1>
<button className="headerBtn">Sign in / Register</button>
      </div>
      </div>
  );
};

export default Header;
