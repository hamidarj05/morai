import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../auth/authService";

export default function PrivateRoute() {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />; // outlet permet d'afficher le composant qui est dans le route
}
