import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Switch, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { formatCoord } from "../../utils/formatCoord";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LoadingOutlined } from "@ant-design/icons";
import api from "../../api/api";

const { Title } = Typography;

const BUS_ICON_URL = "https://cdn-icons-png.flaticon.com/512/3448/3448339.png";
const BUS_STOP_ICON_URL = "https://cdn-icons-png.flaticon.com/512/2916/2916369.png";

const BusLocation = () => {
  const [busPosition, setBusPosition] = useState([]);
  const [busStops, setBusStops] = useState([]);
  const [direction, setDirection] = useState([]);
  const { id, variant } = useParams();
  const navigate = useNavigate();

  const bus = L.icon({
    iconUrl: BUS_ICON_URL,
    iconSize: [30, 30],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  const busStop = L.icon({
    iconUrl: BUS_STOP_ICON_URL,
    iconSize: [30, 30],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  const fetchDirections = async () => {
    try {
      const response = await api.get(`RouteVariantDirection/GetActiveByRoute?id=${variant}`);
      setDirection(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBusStop = async (change) => {
    try {
      const directionIndex = change ? 0 : 1;
      const response = await api.post(`/BusStopRoute/GetByRVD?id=${direction[directionIndex].ID}`);
      setBusStops(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDirections();
    const fetchBusPosition = async () => {
      try {
        const response = await api.get(`/MobileActualState/Get?route=${id}`);
        setBusPosition(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(fetchBusPosition, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <center>
      <div className="app-container">
        <Card
          style={{ width: "auto" }}
          actions={[
            <Button type="ghost" onClick={handleBack}>
              Voltar
            </Button>,
          ]}
        >
          <Switch
            checkedChildren={direction.length > 0 && direction[0]["Description"]}
            unCheckedChildren={direction.length > 0 && direction[1]["Description"]}
            onChange={(change) => fetchBusStop(change)}
          />
          <Divider />

          <MapContainer 
            center={[-22.275686, -42.536141]}
            zoom={13}
            style={{ height: "80vh", width: "80vw" }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {busPosition.length > 0 &&
              busPosition.map((item) => (
                <Marker
                  key={item.id}
                  position={formatCoord(item.Localization)}
                  icon={bus}
                ></Marker>
              ))}
            {busStops.length > 0 &&
              busStops.map((item) => (
                <Marker
                  key={item.id}
                  position={formatCoord(item.GeometryPoint)}
                  icon={busStop}
                >
                  <Popup direction="auto" permanent>
                    {item.ShortName}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </Card>
      </div>
    </center>
  );
};

export default BusLocation;
