import { Table } from 'antd'
import React from 'react'
import { getDate } from '../../utils/getDate';
import { formatCoord } from '../../utils/formatCoord';

const ModalTable = ({ data }) => {
    const columns = [
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
            render: () =>
                formatCoord(
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
    return (
        <Table
            columns={columns}
            dataSource={data}
            tableLayout="auto"
        />
    )
}

export default ModalTable