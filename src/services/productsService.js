import { URL_BACKEND_API } from "../constants";
import axios from "axios";

export const getAllProducts = async () => {
  const url = `${URL_BACKEND_API}/products`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    return null;
  }
}

export const deleteProductById = async (idProduct) => {
  const url = `${URL_BACKEND_API}/products/${idProduct}`;

  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (e) {
    return null;
  }
}

export const createProduct = async (formData) => {
  const url = `${URL_BACKEND_API}/products`;

  try {
    const response = await axios.post(url, formData);
    return response.data;
  } catch (e) {
    return null;
  }
}

export const updateProduct = async (idProduct, formData) => {
  const url = `${URL_BACKEND_API}/products/${idProduct}`;

  try {
    const response = await axios.put(url, formData);
    return response.data;
  } catch (e) {
    return null;
  }
}
