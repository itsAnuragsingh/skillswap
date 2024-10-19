import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return <Outlet />;
};

export default PublicLayout