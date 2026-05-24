import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user, allowedRoles }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/invoices" replace />;
  }

  return children;
}

export default ProtectedRoute;
