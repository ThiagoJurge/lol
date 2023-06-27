import React, { useEffect, useState } from "react";
import { callApi } from "../../api/api";
import { Select } from "antd";

const BusWay = ({ id, selectedWay }) => {
  const [data, setData] = useState([])
  const fetchData = async () => {
    try {
      const response = await callApi.getActiveRoute(id);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedWay]);

  const handleSelectChange = (value) => {
    selectedWay(value);
  };

  return (<>{id && 
    <Select
      style={{ width: "100%" }}
      id="selectInput"
      onChange={handleSelectChange}
      placeholder="Em qual sentido?"
    >
      {selectedWay &&
        data.map((item) => (
          <Select.Option key={item.ID} value={`[${item.ID}, "${item.Direction}"]`}>
            {item.Direction == "Down" ? "Bairro" : "Estação Livre"}
          </Select.Option>
        ))}
    </Select>}</>
  );
};

export default BusWay;
