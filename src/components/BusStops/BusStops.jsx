import React, { useEffect, useState } from "react";
import { callApi } from "../../api/api";
import { Marker, Popup } from "react-leaflet";
import { formatCoord } from "../../utils/formatCoord";

const BusStops = ({ id, icon }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await callApi.getBusStop(id);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      {data.length > 0 &&
        data.map((item) => (
          <Marker
            key={item.Id}
            position={formatCoord(item.GeometryPoint)}
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

export default BusStops;
