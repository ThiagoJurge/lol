import { Button, Divider, Drawer, Space } from "antd";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LinkedinOutlined, MenuOutlined } from "@ant-design/icons";
import BusList from "../BusList/BusList";
import BusWay from "../BusWay/BusWay";
import BusStops from "../BusStops/BusStops";
import BusLocation from "../BusLocation/BusLocation";
import "./MapBus.css";
import Paragraph from "antd/es/typography/Paragraph";
import Link from "antd/es/typography/Link";
import ButtonHorario from "../ButtonHorario/ButtonHorario";

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
    className: "BusIcon",
  });
  const BusStopIcon = L.icon({
    iconUrl: BUS_STOP_ICON_URL,
    iconSize: [20, 20],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
    className: "BusStopIcon",
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
        size="large"
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
          position: "relative",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedWay[1] && selectedValue ? (
          <BusLocation
            id={selectedValue[1]}
            icon={BusIcon}
            direcao={selectedWay[1]}
          />
        ) : null}
        <BusStops
          id={selectedWay.length > 0 && selectedWay[0]}
          icon={BusStopIcon}
        />
      </MapContainer>
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={open}
        footer={
          <Paragraph strong>
            [BETA] Developed by{" "}
            <Link
              href="https://www.linkedin.com/in/thiago-jurge/"
              target="_blank"
            >
              <LinkedinOutlined /> TJurge
            </Link>
          </Paragraph>
        }
        style={{ textAlign: "center" }}
      >
        <BusList onSelectChange={handleSelectChange} />
        {selectedValue[0] && (
          <>
            <Divider>Sentido</Divider>
            <BusWay id={selectedValue[0]} selectedWay={selectedWayChange} />
          </>
        )}

        {selectedValue[1] && (
          <>
            <Divider>Horários</Divider>
            <Space.Compact block>
              <ButtonHorario n_onibus={selectedValue[1]} tabela="U" />
              <ButtonHorario n_onibus={selectedValue[1]} tabela="S" />
              <ButtonHorario n_onibus={selectedValue[1]} tabela="D" />
            </Space.Compact>
          </>
        )}
      </Drawer>
    </>
  );
};

export default MapBus;
