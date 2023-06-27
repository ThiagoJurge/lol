import React from "react";
import { Card, Button, Divider, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { EyeFilled } from "@ant-design/icons";
import ButtonHorario from "../ButtonHorario/ButtonHorario";

const BusInfo = () => {
  const { id, name, variant } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleViewLocation = () => {
    navigate(`/locationbus/${id}/${variant}`);
  };

  return (
    <div className="app-container">
      <center>
        <Card
          style={{ width: "auto" }}
          title={name}
          actions={[
            <Button type="ghost" onClick={handleBack}>
              Voltar
            </Button>,
          ]}
        >
          <Button icon={<EyeFilled />} block onClick={handleViewLocation}>
            Ver localização atual
          </Button>
          <Divider dashed>Tabelas</Divider>
          <Space size="small">
            <ButtonHorario n_onibus={id} tabela="U" />
            <ButtonHorario n_onibus={id} tabela="S" />
            <ButtonHorario n_onibus={id} tabela="D" />
          </Space>
        </Card>
      </center>
    </div>
  );
};

export default BusInfo;
