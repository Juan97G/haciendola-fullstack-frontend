import React from 'react';
import "./styles.css";
import {Dropdown, Header as HeaderUI, Icon, Image} from "semantic-ui-react";
import Menu from "./Menu";
import {useAuthStore} from "../../store/AuthStore";
import {Link, useNavigate} from "react-router-dom";

const Header = () => {

  /* STORE */
  const { auth, logout } = useAuthStore();

  const trigger = (
    <Image src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" avatar size="mini" />
  )

  /* HOOKS */
  const navigate = useNavigate();

  /* FUNCTIONS */
  const cerrarSesion = () => {
    logout();
    navigate("/login");
  }

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <Link to="/">
          <HeaderUI as='h2'>
            <Icon name='code' />
            <HeaderUI.Content>Desafío Técnico</HeaderUI.Content>
          </HeaderUI>
        </Link>

        <Menu />

        <Dropdown trigger={trigger}>
          <Dropdown.Menu>
            <Dropdown.Item disabled >
              Hola, <b>{ auth?.nameUser.split(" ")[0] }</b>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/cambiar-contrasenia")}>
              Cambiar mi contraseña
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => cerrarSesion()}>
              Cerrar sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
