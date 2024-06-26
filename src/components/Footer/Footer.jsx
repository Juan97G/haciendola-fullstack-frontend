import React from 'react';
import "./styles.css";
import {Header, Icon} from "semantic-ui-react";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <Header className="ui-header">
          <Icon name='code'/>
          <Header.Content>Desafío Técnico Programador Fullstack - Haciendola.com</Header.Content>
        </Header>
        <Header className="ui-header">
          <Header.Content>Desarrollado por: Juan Carlos Guzmán Rojas</Header.Content>
        </Header>
      </div>
    </footer>
  );
};

export default Footer;
