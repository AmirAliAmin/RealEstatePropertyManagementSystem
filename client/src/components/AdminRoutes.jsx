import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoutes({ children }) {
  const { user, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/admin" replace />; // not logged in
   return user.role === "ADMIN" ? children : <Navigate to="/home" replace />;
}
