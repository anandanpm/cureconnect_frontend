import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  adminOnly?: boolean;
  userOnly?: boolean;
  doctorOnly?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  adminOnly,
  userOnly,
  doctorOnly,
  children,
}) => {
  // Get user details from the store
  const admin = useSelector((state: any) => state.admin);
  const user = useSelector((state: any) => state.user);
  const doctor = useSelector((state: any) => state.doctor);

  if (!admin && !user &&!doctor) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/" replace />;
  }

  if (adminOnly && admin.role !== "admin") {
    // Redirect to an error page or unauthorized page if the user is not an admin
    return <Navigate to="/unauthorized" replace />;
  }

  if (userOnly && user.role !== "patient") {
    // Redirect to an error page or unauthorized page if the user is not a user
    return <Navigate to="/login" replace />;
  }

  if(doctorOnly && doctor.role !== "doctor"){
    return <Navigate to="/doctor/login" replace />;
  }



  // Render the protected component if all conditions are satisfied
  return <>{children}</>;
};

export default ProtectedRoute;
