import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Overview } from './pages/dashboard/Overview';
import { Subscriptions } from './pages/dashboard/Subscriptions';
import { Workflows } from './pages/dashboard/Workflows';
import { ApiSpecs } from './pages/dashboard/ApiSpecs';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Standalone Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Dashboard Protected Views */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="workflows" element={<Workflows />} />
        <Route path="api-specs" element={<ApiSpecs />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
