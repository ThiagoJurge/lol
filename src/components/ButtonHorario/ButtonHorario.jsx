import { Button } from "antd";
import React from "react";

const ButtonHorario = ({ n_onibus, tabela }) => {
    return (
        <Button
            type="default"
            target="_blank"
            href={
                "https://faol.com.br/tabelas/" +
                n_onibus.match(/[0-9]{2}/) +
                "-" +
                tabela
            }
        >
            {tabela === "D" ? "Domingo" : tabela === "S" ? "Sábado" : "Dias Úteis"}
        </Button>
    );
};

export default ButtonHorario;
