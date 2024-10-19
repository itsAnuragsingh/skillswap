import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateLayout;