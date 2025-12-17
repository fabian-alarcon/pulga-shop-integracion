import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "../layouts/app/AppLayout";

export default function AuthRoutes() {
  useEffect(() => {
    if (
      import.meta.env.VITE_SKIP_AUTH === "true" &&
      !localStorage.getItem("jwt")
    ) {
      localStorage.setItem(
        "jwt",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWRU5EXzAwMSIsImVtYWlsIjoiY29ycmVvQGNvcnJlby5jb20iLCJyb2xlIjoidmVuZGVkb3IiLCJpYXQiOjE3NjU1MzU2NDUsImV4cCI6MjA1MTE1MTY0NX0.sN3YOQGmGwJfQRzVvPZEfG8xDoXqQMjX_3X0obGd5qk "
      );
    }
  }, []);

  const isAuthenticated = Boolean(localStorage.getItem("jwt"));

  if (!isAuthenticated) {
    return <Navigate to="/auth-test/login" replace />;
  }

  return <AppLayout />;
}
