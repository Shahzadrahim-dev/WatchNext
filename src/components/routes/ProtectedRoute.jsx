import { Navigate } from "react-router-dom";

function ProtectedRoute({
  check,
  redirectTo = "/",
  children,
}) {
  const isAllowed = check();

  if (!isAllowed) {
    console.warn(
      "ProtectedRoute blocked access, redirecting to",
      redirectTo,
    );
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;
