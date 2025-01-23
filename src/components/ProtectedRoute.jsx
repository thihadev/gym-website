import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {

  if (!user.user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
