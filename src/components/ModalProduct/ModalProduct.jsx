import React, {useState} from 'react';
import "./styles.css";
import {Button, Form, Modal} from "semantic-ui-react";
import {useFormProductStore} from "../../store/FormProductStore";
import {useFormik} from "formik";
import {initialValuesProduct, validationSchemaProduct} from "./utils";
import {createProduct, updateProduct} from "../../services/productsService";
import {toast} from "react-toastify";

const ModalProduct = () => {

  /* STATES */
  const [isLoading, setIsLoading] = useState(false);

  /* STORE */
  const { open, titleModal, textButton, isCreate, product, closeModal } = useFormProductStore();

  /* FORMIK */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesProduct(product),
    validationSchema: validationSchemaProduct,

    onSubmit: async (formData) => {
      setIsLoading(true);

      if (isCreate) {
        const response = await createProduct(formData);

        if (response) {
          closeModalForm();
          toast.success("Producto creado correctamente");
        } else {
          toast.error("Se ha presentado un error al crear el producto");
        }
      }

      if (!isCreate) {
        const response = await updateProduct(product.id, formData);

        if (response) {
          closeModalForm();
          toast.success("Producto actualizado correctamente");
        } else {
          toast.error("Se ha presentado un error al actualizar el producto");
        }
      }

      setIsLoading(false);
    }
  });

  /* FUNCTIONS */
  const generateHandler = () => {
    formik.setFieldValue("handle", formik.values.title.toLowerCase().replaceAll(" ", "-"));
  }

  function closeModalForm() {
    formik.resetForm();
    closeModal();
  }

  return (
    <div className="modal-form-product-container">
      <Modal
        dimmer="blurring"
        size="tiny"
        open={open}
        onClose={() => closeModalForm()}
      >
        <Modal.Header>{titleModal}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label htmlFor="title">Título</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onKeyUp={() => generateHandler()}
              />
              {formik.errors.title && formik.touched.title
                ? (<span className="field-error">{formik.errors.title}</span>)
                : null
              }
            </Form.Field>
            <Form.Field>
              <label htmlFor="handle">Handle</label>
              <input
                type="text"
                name="handle"
                id="handle"
                readOnly
                value={formik.values.handle}
                style={{ cursor: 'no-drop' }}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                name="description"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description && formik.touched.description
                ? (<span className="field-error">{formik.errors.description}</span>)
                : null
              }
            </Form.Field>
            <Form.Field>
              <label htmlFor="sku">SKU</label>
              <input
                type="text"
                name="sku"
                id="sku"
                value={formik.values.sku}
                onChange={formik.handleChange}
              />
              {formik.errors.sku && formik.touched.sku
                ? (<span className="field-error">{formik.errors.sku}</span>)
                : null
              }
            </Form.Field>
            <Form.Field>
              <label htmlFor="grams">Gramos</label>
              <input
                type="text"
                name="grams"
                id="grams"
                value={formik.values.grams}
                onChange={formik.handleChange}
              />
              {formik.errors.grams && formik.touched.grams
                ? (<span className="field-error">{formik.errors.grams}</span>)
                : null
              }
            </Form.Field>
            <Form.Field>
              <label htmlFor="stock">Stock</label>
              <input
                type="text"
                name="stock"
                id="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
              />
              {formik.errors.stock && formik.touched.stock
                ? (<span className="field-error">{formik.errors.stock}</span>)
                : null
              }
            </Form.Field>
            <Form.Field>
              <label htmlFor="price">Precio</label>
              <input
                type="text"
                name="price"
                id="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.errors.price && formik.touched.price
                ? (<span className="field-error">{formik.errors.price}</span>)
                : null
              }
            </Form.Field>
            <Form.Field>
              <label htmlFor="comparePrice">Comparar Precio</label>
              <input
                type="text"
                name="comparePrice"
                id="comparePrice"
                value={formik.values.comparePrice}
                onChange={formik.handleChange}
              />
              {formik.errors.comparePrice && formik.touched.comparePrice
                ? (<span className="field-error">{formik.errors.comparePrice}</span>)
                : null
              }
            </Form.Field>
            <Form.Field>
              <label htmlFor="barcode">Código de barras</label>
              <input
                type="text"
                name="barcode"
                id="barcode"
                value={formik.values.barcode}
                onChange={formik.handleChange}
              />
              {formik.errors.barcode && formik.touched.barcode
                ? (<span className="field-error">{formik.errors.barcode}</span>)
                : null
              }
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => closeModalForm()} negative>
            Cancelar
          </Button>
          <Button type="submit" onClick={() => formik.handleSubmit()} loading={isLoading}>
            {textButton}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ModalProduct;
