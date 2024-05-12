import React, {useState} from 'react';
import "./styles.css";
import {useNavigate} from "react-router-dom";
import {Button, Form, Icon, Input} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {loginService} from "../../services/authService";
import {toast} from "react-toastify";
import {useAuthStore} from "../../store/AuthStore";

const Login = () => {

  /* STATE */
  const [loadingForm, setLoadingForm] = useState(false);

  /* STORE */
  const { login } = useAuthStore();

  /* HOOKS */
  const navigate = useNavigate();

  /* FORMIK */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email("Formato de email inválido").required("Campo email es requerido"),
      password: Yup.string().required("Campo contraseña es requerido")
    }),

    onSubmit: async (formData) => {
      setLoadingForm(true);

      const respLogin = await loginService(formData);

      if (respLogin) {
        login(respLogin.token);
        toast.success("Inicio de sesión correcto");
        navigate("/home");
      } else {
        toast.error("Email o contraseña incorrectos");
      }

      setLoadingForm(false);
    }
  })

  return (
    <section className="login-container">
      <div className="card-container-login">
        <h2>Iniciar Sesión</h2>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Field>
            <div className="container-field">
              <Input iconPosition='left' placeholder='Email' transparent>
                <Icon name='at'/>
                <input
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Input>
              {formik.errors.email && formik.touched.email
                ? (<span className="field-error">{formik.errors.email}</span>)
                : null
              }
            </div>

            <div className="container-field">
              <Input iconPosition='left' placeholder='Contraseña' transparent>
                <Icon name='lock'/>
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </Input>
              {formik.errors.password && formik.touched.password
                ? (<span className="field-error">{formik.errors.password}</span>)
                : null
              }
            </div>
            <Button type="submit" fluid loading={loadingForm}>
              INGRESAR
            </Button>
          </Form.Field>
        </Form>
      </div>
    </section>
  );
};

export default Login;
