import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ConfigProvider, theme } from "antd";
const { darkAlgorithm, compactAlgorithm } = theme;

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
      theme={{
        algorithm: [compactAlgorithm],
        token: {
          colorPrimary: "#244472",
          wireframe: false,
        },
      }}
    >
    <App />
  </ConfigProvider>,
)
