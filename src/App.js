import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Suspense, useEffect} from "react";
import Loading from "./components/Loading";
import {ToastContainer} from "react-toastify";
import Login from "./pages/login";
import Home from "./pages/home";
import {useAuthStore} from "./store/AuthStore";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import Products from "./pages/products";
import CambiarClave from "./pages/cambiar-clave";

function App() {

  const { validateLogin } = useAuthStore();

  useEffect(() => {
    validateLogin();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/" /> } />
          <Route path="login" element={<Login/>} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="productos" element={<Products />} />
          <Route path="cambiar-contrasenia" element={<CambiarClave />} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose="4000"
      />
    </BrowserRouter>
  );
}

export default App;
