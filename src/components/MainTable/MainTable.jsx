import React, { useRef, useState } from "react";
import bus_list from "../../bus_list.json";
import { Button, Space, Table } from "antd";
import ButtonHorario from "../ButtonHorario/ButtonHorario";
import api from "../../api/api";
import ModalQuery from "../ModalQuery/ModalQuery";
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Highlighter from 'react-highlight-words';


const MainTable = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


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
            ...getColumnSearchProps('NomeCarreira'),
        },
        {
            title: "Horários",
            dataIndex: "NrCarreira",
            key: "NrCarreira",
            render: (text) => (
                <>
                    <Space.Compact style={{ width: "100%" }}>
                        <ButtonHorario n_onibus={text} tabela={"U"} />
                        <ButtonHorario n_onibus={text} tabela={"S"} />
                        <ButtonHorario n_onibus={text} tabela={"D"} />
                    </Space.Compact>
                </>
            ),
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
    ];
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

    return (
        <>
            <Table
                columns={columns}
                dataSource={bus_list}
                tableLayout="auto"
            />
            <ModalQuery isModalOpen={isModalOpen} handleOk={handleOk} data={data} />
        </>
    );
};

export default MainTable;
