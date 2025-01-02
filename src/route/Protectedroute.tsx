import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../redux/store';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'doctor' | 'admin';
}

const checkAuth = (state: RootState, role: 'user' | 'doctor' | 'admin'): boolean => {
  console.log('Checking auth for role:', role);

  const tokenKeys = {
    user: ['accessToken', 'refreshToken'],
    doctor: ['docAccessToken', 'docRefreshToken'],
    admin: ['adminAccessToken', 'adminRefreshToken']
  };

  const [accessTokenKey, refreshTokenKey] = tokenKeys[role];
  
  console.log('Access Token Key:', accessTokenKey);
  console.log('Refresh Token Key:', refreshTokenKey);

  if (!accessTokenKey || !refreshTokenKey) {
    console.log('Token keys not found for role:', role);
    return false;
  }

  const accessToken = Cookies.get(accessTokenKey);
  const refreshToken = Cookies.get(refreshTokenKey);

  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refreshToken);

  const isAuthenticated = !!accessToken && !!refreshToken 
  console.log('Is Authenticated:', isAuthenticated);

  return isAuthenticated;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const location = useLocation();
  const state = useSelector((state: RootState) => state);

  const isUserAuth = checkAuth(state, 'user');
  const isDoctorAuth = checkAuth(state, 'doctor');
  const isAdminAuth = checkAuth(state, 'admin');

  if (requiredRole) {
    if (!checkAuth(state, requiredRole)) {
      return <Navigate to={`/${requiredRole}/login`} state={{ from: location }} replace />;
    }
  } else if (!isUserAuth && !isDoctorAuth && !isAdminAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

