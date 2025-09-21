import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import QRCodeScanner from './pages/qr-code-scanner';
import QRCodeGenerator from './pages/qr-code-generator';
import AdminLogin from './pages/admin-login';
import LandingPage from './pages/landing-page';
import StudentManagement from './pages/student-management';
import AdministrativeDashboard from './pages/administrative-dashboard';
import AttendancePage from './pages/attendance';
import AnalyticsDashboard from './pages/analytics-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/administrative-dashboard" element={<AdministrativeDashboard />} />
        <Route path="/student-management" element={<StudentManagement />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
        <Route path="/qr-code-scanner" element={<QRCodeScanner />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;