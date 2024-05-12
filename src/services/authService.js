import axios from "axios";
import { URL_BACKEND_API } from "../constants";

export const loginService = async (credentials) => {
  const url = `${URL_BACKEND_API}/auth/login`;

  try {
    const response = await axios.post(url, credentials);
    return response.data;
  } catch (e) {
    return null;
  }
}
