import React from 'react';
import "./styles.css";
import {useAuthStore} from "../../store/AuthStore";
import {useNavigate} from "react-router-dom";
import Layout from "../../components/Layout";

const Home = () => {

  /* STORE */
  const { auth } = useAuthStore();

  /* HOOKS */
  const navigate = useNavigate();


  if (!auth) return navigate("/login")

  return (
    <Layout>
      <div className="home-container">
        <h1>Bienvenido/a &#129395;</h1>
        <p>A continuación vas a conocer mi desarrollo para la prueba técnica fullstack para Haciendola.com</p>
        <p>Con mucho gusto desde Ibagué - Tolima, Colombia.</p>
      </div>
    </Layout>
  );
};

export default Home;
