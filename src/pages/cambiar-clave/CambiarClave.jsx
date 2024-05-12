import React, {useState} from 'react';
import "./styles.css";
import * as Yup from "yup";
import Layout from "../../components/Layout";
import {useAuthStore} from "../../store/AuthStore";
import {useNavigate} from "react-router-dom";
import {Button, Card, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import {jwtDecode} from "jwt-decode";
import {changePassword} from "../../services/userService";
import {toast} from "react-toastify";

const CambiarClave = () => {

  /* STATES */
  const [isLoading, setIsLoading] = useState(false);

  /* STORE */
  const { auth } = useAuthStore();

  /* HOOKS */
  const navigate = useNavigate();

  /* FORMIK */
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },

    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required("La contraseña actual es requerida"),
      newPassword: Yup.string().required("La nueva contraseña es requerida"),
      repeatNewPassword: Yup.string().required("La repetición de la nueva contraseña es requerida")
                                    .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
    }),

    onSubmit: async (formData) => {
      setIsLoading(true);

      const data = {
        email: jwtDecode(auth.token).email,
        oldPassword: formData.currentPassword,
        password: formData.newPassword
      };

      const response = await changePassword(data);

      if (response.status === 200) {
        toast.success(response.data.message);
        formik.resetForm();
        navigate("/");
      } else {
        toast.error(response.data.message);
      }

      setIsLoading(false);
    }
  })
  //console.log()
  if (!auth) navigate("/unauthorized");

  return (
    <Layout>
      <div className="change-password-container">
        <Card fluid>
          <Card.Content>
            <Card.Header as="h1" textAlign="center">Cambiar mi contraseña</Card.Header>
          </Card.Content>
          <Card.Content>
            <Form>
              <Form.Field>
                <label htmlFor="currentPassword">Contraseña actual</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.currentPassword && formik.touched.currentPassword
                    ? (<span className="field-error">{formik.errors.currentPassword}</span>)
                    : null
                }
              </Form.Field>
              <Form.Field>
                <label htmlFor="newPassword">Nueva contraseña</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.newPassword && formik.touched.newPassword
                    ? (<span className="field-error">{formik.errors.newPassword}</span>)
                    : null
                }
              </Form.Field>
              <Form.Field>
                <label htmlFor="repeatNewPassword">Repetir nueva contraseña</label>
                <input
                  type="password"
                  name="repeatNewPassword"
                  value={formik.values.repeatNewPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.repeatNewPassword && formik.touched.repeatNewPassword
                    ? (<span className="field-error">{formik.errors.repeatNewPassword}</span>)
                    : null
                }
              </Form.Field>
            </Form>
          </Card.Content>
          <Card.Content extra>
            <Button type="submit" onClick={() => formik.handleSubmit()} loading={isLoading}>
              Cambiar
            </Button>
          </Card.Content>
        </Card>
      </div>
    </Layout>
  );
};

export default CambiarClave;
