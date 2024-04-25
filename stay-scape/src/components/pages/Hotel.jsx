import React from "react";
import { useEffect, useState } from "react";

const Hotel = () => {
  const [hotel, setHotel] = useState(null);

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

  useEffect(() => {
    const getHotel = async () => {
      try {
        const jwtToken = localStorage.getItem("login_token");
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf("/") + 1);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/properties/${id}`,
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
          setHotel(data);
        } else {
          console.error("Error during hotel fetch:", data.message);
        }
      } catch (error) {
        console.error("Error during hotel fetch:", error);
      }
    };
    getHotel();
  }, []);

  const deleteHotel = async (id) => {
    try {
      const jwtToken = localStorage.getItem("login_token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/properties/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Hotel deleted");
      } else {
        console.error("Error during hotel delete:", data.message);
      }
    } catch (error) {
      console.error("Error during hotel delete:", error);
    }
  };

  const editHotel = async () => {
    try {
      const jwtToken = localStorage.getItem("login_token");
      const url = window.location.href;
      const id = url.substring(url.lastIndexOf("/") + 1);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/properties/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            name: name,
            website: website,
            phoneNumber: phone,
            description: description,
            longitude: longitude,
            latitude: latitude,
            address: {
              street: street,
              streetNumber: streetNumber,
              city: city,
              postalCode: postalCode,
              country: country,
            },
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Hotel edited");
        setHotel(data);
      } else {
        console.error("Error during hotel edit:", data.message);
      }
    } catch (error) {
      console.error("Error during hotel edit:", error);
    }
  };

  return (
    <div>
      {hotel && (
        <div>
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
          <div className="listItem">postalCode: {hotel.address.postalCode}</div>
          <div className="listItem">country: {hotel.address.country}</div>

          <button onClick={() => deleteHotel(hotel.id)}>Delete</button>

          <div>
            Edit hotel
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

              <button onClick={editHotel}>Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;
