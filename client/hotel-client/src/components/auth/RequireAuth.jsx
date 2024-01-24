import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

function RequireAuth({ children }) {
  const { userId } = useAuthContext();
  if (!userId) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
