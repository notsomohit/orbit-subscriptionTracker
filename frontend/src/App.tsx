import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Overview } from './pages/dashboard/Overview';
import { Subscriptions } from './pages/dashboard/Subscriptions';
import { Workflows } from './pages/dashboard/Workflows';
import { ApiSpecs } from './pages/dashboard/ApiSpecs';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Standalone Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Dashboard Protected Views - Redirects unauthenticated to "/" */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="api-specs" element={<ApiSpecs />} />
        </Route>
      </Route>

      {/* 404 - On-theme not found page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
