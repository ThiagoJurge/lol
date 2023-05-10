import { Button } from 'antd';
import React from 'react'

export const formatCoord = (coord) => {
  const coord_final = coord.replace(",-", "-").replace(/(,)[^,]*$/, "");
  return (
    <Button target="_blank" href={"https://www.google.com/maps?q=" + coord_final}>
      Ver no Mapa
    </Button>
  );
}

