import { Navigate } from "react-router-dom";
import BlankLayout from "../layouts/blank-layout/BlankLayout";
import AuthLayout from "../layouts/auth/AuthLayout";
import Error from "../views/authentication/Error";
import Login from "../views/authentication/Login";
import Register from "../views/authentication/Register";

import AuthRoutes from "./../components/AuthRoutes";
import RoleGuard from "./../components/RoleGuard"; // <--- Importamos el nuevo Guard
import AppHome from "./../views/app/appHome";
import StorePage from "./../views/app/storePage";
import DeletedProducts from "../views/app/deleted-products";

const Router = [
  {
    path: "/auth-test",
    element: <AuthLayout />,
    children: [
      { path: "", element: <Navigate to="/auth-test/login" /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Navigate to="/error/404" /> },
    ],
  },
  {
    path: "/",
    // Aplicamos primero AuthRoutes y luego RoleGuard para doble validación
    element: <AuthRoutes />, 
    children: [
      {
        element: <RoleGuard />, // <--- Envolvemos las rutas de inventario
        children: [
          { path: "", element: <AppHome /> },
          { path: "app/tiendas/:tiendaId", element: <StorePage /> },
          {
            path: "app/tiendas/:tiendaId/productos-eliminados",
            element: <DeletedProducts />,
          },
        ]
      }
    ],
  },
  {
    path: "/error",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "*", element: <Navigate to="/error/404" /> },
    ],
  },
];

export default Router;