import React from 'react';
import "./styles.css";
import { Menu as MenuUI } from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

const Menu = () => {

  /* HOOKS */
  const navigate = useNavigate();

  return (
    <MenuUI>
      <MenuUI.Item
        name='inicio'
        onClick={() => navigate("/")}
      >
        Inicio
      </MenuUI.Item>

      <MenuUI.Item
        name='Productos'
        onClick={() => navigate("/productos")}
      >
        Productos
      </MenuUI.Item>
    </MenuUI>
  );
};

export default Menu;
