import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  element: React.ReactNode;
  restricted: boolean;
  isAuthenticated: boolean;
  path:string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, restricted, isAuthenticated }) => {
  return isAuthenticated && restricted ? <Navigate to="/todos" replace /> : <>{element}</>;
};

export default PublicRoute;
