import * as Yup from "yup";

export const initialValuesProduct = (product) => {
  return ({
    title: product?.title || "",
    handle: product?.handle || "",
    description: product?.description || "",
    sku: product?.sku || "",
    grams: product?.grams || "",
    stock: product?.stock || "",
    price: product?.price || "",
    comparePrice: product?.comparePrice || "",
    barcode: product?.barcode || ""
  })
}

export const validationSchemaProduct = Yup.object().shape({
  title: Yup.string().required("El campo Título es requerido"),
  description: Yup.string().required("El campo Descripción es requerido"),
  sku: Yup.number().typeError("El campo debe tener solo números").required("El campo SKU es requerido"),
  grams: Yup.number().typeError("El campo debe tener solo números").required("El campo Gramos es requerido"),
  stock: Yup.number().typeError("El campo debe tener solo números").required("El campo Stock es requerido"),
  price: Yup.number().typeError("El campo debe tener solo números").required("El campo Precio es requerido"),
  comparePrice: Yup.number().typeError("El campo debe tener solo números").required("El campo Comparar Precio es requerido"),
  barcode: Yup.number().typeError("El campo debe tener solo números")
});
