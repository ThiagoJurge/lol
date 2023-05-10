import { Modal } from 'antd'
import React from 'react'
import ModalTable from '../ModalTable/ModalTable'

const ModalQuery = ({ isModalOpen, handleOk, data }) => {
    return (
        <Modal
            title="Informações"
            open={isModalOpen}
            onOk={handleOk}
            okType='default'
            width={1000}
            cancelButtonProps={{ disabled: "true" }}>
            <ModalTable data={data} />
        </Modal>
    )
}

export default ModalQuery