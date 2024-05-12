import {URL_BACKEND_API} from "../constants";
import axios from "axios";

export const changePassword = async (formData) => {
  const url = `${URL_BACKEND_API}/users/password/update`;

  try {
    return await axios.patch(url, formData);
  } catch (e) {
    return e.response;
  }
}
