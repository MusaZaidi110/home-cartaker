import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  // Safely retrieve auth data
  const authData = window.auth?.getAuthData();

  // Check if authData exists and if the user is authenticated
  const isAuthenticated = authData?.isAuthenticated;

  // Redirect to login if not authenticated
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
