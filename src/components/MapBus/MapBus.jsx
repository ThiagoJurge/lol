import { Button, Divider, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MenuOutlined } from "@ant-design/icons";
import BusList from "../BusList/BusList";
import BusWay from "../BusWay/BusWay";
import BusStops from "../BusStops/BusStops";
import BusLocation from "../BusLocation/BusLocation";
import './MapBus.css'

const MapBus = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedWay, setSelectedWay] = useState([]);

  const BUS_ICON_URL =
    "https://cdn-icons-png.flaticon.com/512/3448/3448339.png";
  const BUS_STOP_ICON_URL =
    "https://cdn-icons-png.flaticon.com/512/2916/2916369.png";

  const BusIcon = L.icon({
    iconUrl: BUS_ICON_URL,
    iconSize: [30, 50],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
    className: 'BusIcon'
  });
  const BusStopIcon = L.icon({
    iconUrl: BUS_STOP_ICON_URL,
    iconSize: [20, 20],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
    className: 'BusStopIcon'
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSelectChange = (value) => {
    setSelectedValue(JSON.parse(value));
  };

  const selectedWayChange = (value) => {
    setSelectedWay(JSON.parse(value));
  };

  useEffect(() => {}, [selectedValue]);

  return (
    <>
      <Button
        type="default"
        shape="circle"
        icon={<MenuOutlined />}
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          zIndex: 9999,
        }}
        onClick={showDrawer}
      />

      <MapContainer
        center={[-22.275686, -42.536141]}
        zoom={13}
        style={{
          minWidth: "80vw",
          minHeight: "95vh",
          position: 'relative'
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedWay[1] && selectedValue ? <BusLocation
          id={selectedValue[1]}
          icon={BusIcon}
          direcao={selectedWay[1]}
        /> : null}
        <BusStops
          id={selectedWay.length > 0 && selectedWay[0]}
          icon={BusStopIcon}
        />
      </MapContainer>
      <Drawer title="Menu" placement="right" onClose={onClose} open={open}>
        <BusList onSelectChange={handleSelectChange} />
        <Divider />
        {selectedValue[0] && <BusWay id={selectedValue[0]} selectedWay={selectedWayChange} />}
      </Drawer>
    </>
  );
};

export default MapBus;
