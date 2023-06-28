import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { formatCoord } from "../../utils/formatCoord";
import { callApi } from "../../api/api";

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
