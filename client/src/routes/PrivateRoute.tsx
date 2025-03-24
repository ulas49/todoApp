import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps  {
  element: React.ReactNode;
  isAuthenticated: boolean;
  path:string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
