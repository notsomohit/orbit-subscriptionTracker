import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 bg-[#F5D90A] border-3 border-black shadow-[4px_4px_0px_#111] animate-bounce flex items-center justify-center font-display font-black text-base">
            O•
          </div>
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-black">
            VERIFYING CREDENTIALS...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

