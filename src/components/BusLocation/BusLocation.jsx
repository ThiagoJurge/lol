import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { formatCoord } from "../../utils/formatCoord";
import { callApi } from "../../api/api";
import axios from "axios";

const convertCoordinates = async ([latitude, longitude]) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    );
    const addressData = response.data;
    return `${addressData.address.road}, ${addressData.address.city}`;
  } catch (error) {
    throw new Error("Erro ao converter coordenadas");
  }
};

const showNotification = (address) => {
  if (Notification && navigator.serviceWorker) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("Nova Localização", {
            body: address,
          });
        });
      }
    });
  }
};

const BusLocation = ({ id, icon, direcao }) => {
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState();

  const fetchBusLocationData = async () => {
    try {
      const response = await callApi.getBusLocation(id);
      const filtredData = response.filter(
        (item) => item.Direction === direction
      );
      setData(filtredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDirection(direcao === "Down" ? "ASC" : "DESC");

    // Fetch data initially
    fetchBusLocationData();

    // Fetch data every 1 second
    const interval = setInterval(fetchBusLocationData, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [direcao, id, direction]);

  return (
    <>
      {data.length > 0 &&
        data.map((item) => (
          <Marker
            key={item.Id}
            position={formatCoord(item.Localization)}
            icon={icon}
          >
            <Popup direction="auto" permanent>
              {item.ShortName}
            </Popup>
          </Marker>
        ))}
    </>
  );
};

export default BusLocation;
