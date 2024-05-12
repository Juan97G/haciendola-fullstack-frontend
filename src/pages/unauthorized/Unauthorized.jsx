import React from 'react';
import "./styles.css";
import {Button, Icon} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

const Unauthorized = () => {

  /* HOOKS */
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <span>&#128577;</span>
      <h1>No estás autorizado/a para ingresar a la página solicitada</h1>
      <p>Por favor ingrese al sistema para poder navegar sin inconvenientes</p>
      <Button size="massive" onClick={() => navigate("/login")}>
        Iniciar sesión
      </Button>
    </div>
  );
};

export default Unauthorized;
