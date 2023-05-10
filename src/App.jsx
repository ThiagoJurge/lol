import { useEffect, useState } from "react";
import { Alert, Button, Card, Input, Modal, Radio, Space, Table } from "antd";
import { Typography } from "antd";
const { Title } = Typography;

import api from "../public/api/api";
import bus_list from "./bus_list.json";

function App() {
  
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Número",
      dataIndex: "NrCarreira",
      key: "NrCarreira",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Itinerário",
      dataIndex: "NomeCarreira",
      key: "NomeCarreira",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Consultas",
      dataIndex: "NrCarreira",
      key: "NrCarreira",
      render: (text) => (
        <Button type="default" onClick={() => showModal(text)}>
          Consultar
        </Button>
      ),
    },
    {
      title: "Horários",
      dataIndex: "NrCarreira",
      key: "NrCarreira",
      render: (text) => (
        <>
        <Space.Compact style={{ width: '100%' }}>
        <Button type="default" target="_blank" href={"https://faol.com.br/tabelas/"+text.match(/[0-9]{2}/)+"-U"}>
          Dias Úteis
        </Button>
        <Button type="default" target="_blank" href={"https://faol.com.br/tabelas/"+text.match(/[0-9]{2}/)+"-S"}>
          Sábado
        </Button>
        <Button type="default" target="_blank" href={"https://faol.com.br/tabelas/"+text.match(/[0-9]{2}/)+"-D"}>
          Domingo
        </Button>
    </Space.Compact>
        </>
      ),
    },
  ];

  function format(coord) {
    const coord_final = coord.replace(",-", "-").replace(/(,)[^,]*$/, "");
    return (
      <a target="_blank" href={"https://www.google.com/maps?q=" + coord_final}>
        Ver no Mapa
      </a>
      
    );
  }
  //
  const columnsAlert = [
    {
      title: "Carro",
      dataIndex: "FleetNumber",
      key: "FleetNumber",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Placa",
      dataIndex: "VehiclePlate",
      key: "VehiclePlate",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Sentido",
      dataIndex: "Direction",
      key: "Direction",
      render: (text) => (
        <span>{text === "DESC" ? "Bairro" : "Estação Livre "}</span>
      ),
    },
    {
      title: "Última Consulta",
      dataIndex: "LastGPSTime",
      key: "LastGPSTime",
      render: (text) => (
        <span>{getDate(text.replace("/Date(", "").replace(")/", ""))}</span>
      ),
    },
    {
      title: "Ininerário",
      dataIndex: "Localization",
      key: "Localization",
      render: (text) =>
        format(
          data[0].Localization.replace('{"type":"Point","coordinates":[', "")
            .replace("]}", "")
            .match(/,.*./) +
            "," +
            data[0].Localization.replace('{"type":"Point","coordinates":[', "")
              .replace("]}", "")
              .match(/.*.\,/)
        ),
    },
  ];

  function getDate(date) {
    const date_new = new Date(parseInt(date, 10));
    console.log(date_new);
    return (
      date_new.toLocaleTimeString() + " | " + date_new.toLocaleDateString()
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (n_onibus) => {
    api
      .get("Get?route=" + n_onibus)
      .then((data) => setData(data.data))
      .catch((error) => console.log(error));
    setIsModalOpen(true);
    return n_onibus;
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card title="Sistema de Acompanhamento - LOL" >
      <Table
        columns={columns}
        dataSource={bus_list}
        tableLayout="fixed"
        width={1000}
      />
      <Modal
        title="Informações"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Table columns={columnsAlert} dataSource={data} 
        bordered
        tableLayout="fixed" />
      </Modal>
    </Card>
  );
}

export default App;
