import axios from "axios";

const api = axios.create({
  // Mantenemos tu configuración de URL original
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:16014/api",
});

// Interceptor para inyectar Token e ID de Usuario
api.interceptors.request.use(
  (config) => {
    // 1. Intentamos obtener el token (como estaba antes)
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // 2. EXTRA: Obtener el ID del usuario del objeto 'user' que guarda G4
    const userData = localStorage.getItem('user') || localStorage.getItem('userInfo');
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Enviamos el ID en el header personalizado que configuramos en el Backend G7
        if (user.id) {
          config.headers['x-user-id'] = user.id;
        }
      } catch (e) {
        console.error("Error al recuperar el ID de usuario desde localStorage", e);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;