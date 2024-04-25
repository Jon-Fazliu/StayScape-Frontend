import "./list.css";
import Navbar from "../Navbar";
import Header from "../Header";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";

const List = () => {
  const destination = "";
  const date = "";

  const openDate = false;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const role = localStorage.getItem("role");

  const isAffiliate = role === "AFFILIATE";

  const [hotels, setHotels] = useState([]);

  const createHotel = async () => {
    try {
      const jwtToken = localStorage.getItem("login_token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/properties`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            name: name,
            website: website,
            phoneNumber: phone,
            address: {
              street: street,
              streetNumber: streetNumber,
              city: city,
              postalCode: postalCode,
              country: country,
            },
            description: description,
            longitude: longitude,
            latitude: latitude,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Hotel created");
        hotels.push(data);
      } else {
        console.error("Error during login:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    const getHotels = async () => {
      try {
        const jwtToken = localStorage.getItem("login_token");
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/properties`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setHotels(data.properties);
        } else {
          console.error("Error during login:", data.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };
    getHotels();
  }, []);

  const select = (id) => {
    navigate(`/hotels/${id}`);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        Hotels:
        <div
          className="listWrapper"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {hotels &&
            hotels.map((hotel) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid black",
                }}
              >
                <div className="listItem">id: {hotel.id}</div>
                <div className="listItem">name: {hotel.name}</div>
                <div className="listItem">website: {hotel.website}</div>
                <div className="listItem">phoneNumber: {hotel.phoneNumber}</div>
                <div className="listItem">description: {hotel.description}</div>
                <div className="listItem">longitude: {hotel.longitude}</div>
                <div className="listItem">latitude{hotel.latitude}</div>
                <div className="listItem">street: {hotel.address.street}</div>
                <div className="listItem">
                  streetNumber: {hotel.address.streetNumber}
                </div>
                <div className="listItem">city: {hotel.address.city}</div>
                <div className="listItem">
                  postalCode: {hotel.address.postalCode}
                </div>
                <div className="listItem">country: {hotel.address.country}</div>

                <button onClick={() => select(hotel.id)}>Select</button>
              </div>
            ))}
        </div>
      </div>
      {isAffiliate && (
        <div className="listContainer">
          Create a new hotel
          <div>
            <div>
              <label>Latitude:</label>
              <input
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div>
              <label>Longitude:</label>
              <input
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
            <div>
              <label>Website:</label>
              <input
                type="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
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
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

            <button onClick={createHotel}>Create</button>
          </div>
        </div>
      )}
      {!isAffiliate && (
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input
                  placeholder={destination}
                  type="text"
                  onChange={(e) => console.log("Changed destination")}
                />
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span
                  onClick={() => console.log("Changed check in date")}
                ></span>
                {openDate && (
                  <DateRange
                    onChange={(item) => console.log("Changed date")}
                    minDate={new Date()}
                    ranges={date}
                  />
                )}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min Price <small>per night</small>
                    </span>
                    <input type="number" className="lsOptionInput" />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max Price <small>per night</small>
                    </span>
                    <input type="number" className="lsOptionInput" />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={"options.adult"}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      placeholder={"options.children"}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={"options.room"}
                    />
                  </div>
                </div>
              </div>
              <button>Search</button>
            </div>
            <div className="listResult"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
