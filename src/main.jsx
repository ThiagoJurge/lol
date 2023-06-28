import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider, theme } from "antd";
const { darkAlgorithm } = theme;
import "leaflet/dist/leaflet.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        algorithm: [darkAlgorithm],
        token: {
          colorPrimary: "#244472",
          wireframe: false,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>
);
