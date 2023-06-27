import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { callApi } from "../../api/api";

const BusList = ({ onSelectChange }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await callApi.getBusList();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (value) => {
    onSelectChange(value);
  };

  const filterOptions = (inputValue, option) => {
    const regex = new RegExp(inputValue, "i");
    return option.children.match(regex);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Select
      style={{ width: "100%" }}
      id="selectInput"
      showSearch
      onChange={handleSelectChange}
      filterOption={filterOptions}
      placeholder="Para onde você está indo?"
      defaultValue={164}
    >
      {Object.keys(data).length > 0 &&
        data.map((item) => (
          <Select.Option
            key={item.ID}
            value={`[${item.ID}, "${item.NrCarreira}"]`}
          >
            {item.NomeCarreira}
          </Select.Option>
        ))}
    </Select>
  );
};

export default BusList;
