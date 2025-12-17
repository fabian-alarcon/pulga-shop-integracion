import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = () => {
  const userData = localStorage.getItem('user') || localStorage.getItem('userInfo');

  if (!userData) {
    // Si no hay sesión, al login de G4
    return <Navigate to="/auth/login" replace />;
  }

  try {
    const user = JSON.parse(userData);
    // Verificamos si es vendedor
    const isVendedor = user.roles && user.roles.includes('vendedor');

    if (!isVendedor) {
      alert("Acceso denegado: Esta sección es solo para vendedores.");
      // CAMBIO: Redirigimos a la raíz de auth del sistema principal
      return <Navigate to="/auth" replace />;
    }

    // Si es vendedor, adelante
    return <Outlet />;
  } catch (error) {
    console.error("Error en RoleGuard:", error);
    return <Navigate to="/auth/login" replace />;
  }
};

export default RoleGuard;