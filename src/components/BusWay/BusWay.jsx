import React, { useEffect, useState } from "react";
import { callApi } from "../../api/api";
import { Radio } from "antd";

const BusWay = ({ id, selectedWay }) => {
  const [data, setData] = useState([]);
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
    selectedWay(value.target.value);
  };

  return (
        <Radio.Group onChange={handleSelectChange}>
          {Object.keys(data).length > 0 && data.map((item) => (
            <Radio key={item.ID} value={`[${item.ID}, "${item.Direction}"]`}>
              {item.Direction == "Down" ? "Estação Livre" : "Bairro"}
            </Radio>
          ))}
        </Radio.Group>
  );
};

export default BusWay;
