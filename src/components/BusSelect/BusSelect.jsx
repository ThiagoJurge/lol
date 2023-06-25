import React from "react";
import { Button, Card, Divider, Select } from "antd";
import Title from "antd/es/typography/Title";
import { ImLocation } from "react-icons/im";
import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../../api/api";

const { Option } = Select;

function BusSelect() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await api.get("/Route/OnlyVisible");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(null); // Estado para armazenar o valor selecionado

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const filterOptions = (inputValue, option) => {
    const regex = new RegExp(inputValue, "i");
    return option.children.match(regex);
  };

  return (
    <div className="app-container">
      <Card>
        <div className="title-container">
          <Title level={1}>
            <ImLocation /> Cade Faol
          </Title>
        </div>
        <div className="select-container">
          <Select
            style={{ width: "100%" }}
            id="selectInput"
            showSearch
            onChange={handleSelectChange}
            filterOption={filterOptions}
            placeholder="Para onde você está indo?"
          >
            {Object.keys(data).length > 0 &&
              data.map((item) => (
                <Option
                  key={item.ID}
                  value={`${item.NrCarreira}/${item.NomeCarreira.replace(
                    "/",
                    ""
                  )}/${item.ID}`}
                >
                  {item.NomeCarreira}
                </Option>
              ))}
          </Select>
        </div>
        <Divider />
        {selectedValue && (
          <Button
            icon={<EyeOutlined />}
            style={{ width: "100%" }}
            onClick={() => navigate(`/viewbus/${selectedValue}`)}
          >
            Ver informações
          </Button>
        )}
      </Card>
    </div>
  );
}

export default BusSelect;
