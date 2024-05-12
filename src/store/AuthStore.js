import {create} from "zustand";
import {jwtDecode} from "jwt-decode";

export const useAuthStore = create((set) => ({
  auth: null,
  login: (token) => {
    localStorage.setItem("token", token);

    set(state => ({
      ...state,
      auth: {
        token,
        idUser: jwtDecode(token).id,
        nameUser: jwtDecode(token).name
      }
    }))
  },
  logout: () => {
    localStorage.removeItem("token");
    set(state => ({
      ...state,
      auth: null
    }));
  },
  validateLogin: () => {
    const token = localStorage.getItem("token");

    if (token) {
      set(state => ({
        ...state,
        auth: {
          token,
          idUser: jwtDecode(token).id,
          nameUser: jwtDecode(token).name
        }
      }))
    } else {
      set(state => ({
        ...state,
        auth: null
      }));
    }
  }
}))
