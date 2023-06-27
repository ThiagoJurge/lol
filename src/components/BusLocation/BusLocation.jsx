import React, { useEffect, useState } from "react";
import { callApi } from "../../api/api";
import { Marker, Popup } from "react-leaflet";
import { formatCoord } from "../../utils/formatCoord";

const BusLocation = ({ id, icon, direcao }) => {
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState();

  const fetchData = async () => {
    try {
      const response = await callApi.getBusLocation(id);
      setData(response.filter((item) => item.Direction === direction));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDirection(direcao === "Down" ? "ASC" : "DESC");

    // Fetch data initially
    fetchData();

    // Fetch data every 1 second
    const interval = setInterval(fetchData, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [direcao]);

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
