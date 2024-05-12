import { create } from "zustand";

export const useFormProductStore = create((set) => ({
  open: false,
  titleModal: "",
  textButton: "",
  product: null,
  isCreate: false,
  closeModal: () => set(state => ({
    open: false,
    product: null
  })),
  openModalCreate: () => set(state => ({
    ...state,
    open: true,
    titleModal: "Crear producto",
    textButton: "Crear",
    product: null,
    isCreate: true
  })),
  openModalEdit: (product) => set(state => ({
    ...state,
    open: true,
    titleModal: "Editar producto",
    textButton: "Editar",
    isCreate: false,
    product
  })),
}))
