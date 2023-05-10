import React from "react";
import { Card } from "antd";
import MainTable from "./components/MainTable/MainTable";
import Title from "antd/es/typography/Title";

function App() {

  return (
    <Card title={<center><Title level={1}>Cade Faol ?</Title></center>}>
      <MainTable />
    </Card>
  );
}

export default App;
