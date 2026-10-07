import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "@/lib/adminAuth";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
