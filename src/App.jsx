import React from "react";
import { Card } from "antd";
import MainTable from "./components/MainTable/MainTable";
import Title from "antd/es/typography/Title";
import { ImLocation } from "react-icons/im"

function App() {

  return (
    <Card title={<center><Title level={1}><ImLocation /> Cade Faol </Title></center>}>
      <MainTable />
    </Card>
  );
}

export default App;
