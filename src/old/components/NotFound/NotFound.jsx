import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, a página que você tentou acessar não existe."
      extra={<Button type="primary"><Link to="/">Voltar</Link></Button>}
    />
  );
};

export default NotFound;
