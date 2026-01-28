import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../auth/authService";

export default function AdminRoute() {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/feed" replace />;
  return <Outlet />;
}
