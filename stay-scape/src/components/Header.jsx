import "./header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleHotelsClick = () => {
    navigate("/hotels");
  };

  const handleCoWorkingSpaceClick = () => {
    navigate("/co-working-space");
  };

  const handleTouristSpotsClick = () => {
    navigate("/tourist-spots");
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="active">
            <button onClick={handleHotelsClick}> Hotels</button>
          </div>
          <div className="active">
            <button onClick={handleCoWorkingSpaceClick}>
              {" "}
              CoWorking Space
            </button>
          </div>
          <div className="active">
            <button onClick={handleTouristSpotsClick}> Tourist Spots</button>
          </div>
        </div>

        <h1 className="headerTitle">
          Discover Endless Adventures - Book Your Stay Today!
        </h1>
      </div>
    </div>
  );
};

export default Header;
