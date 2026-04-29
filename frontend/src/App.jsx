import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AIDispatchPage = lazy(() => import('./pages/AIDispatchPage'));
const FleetPage = lazy(() => import('./pages/FleetPage'));
const SafetySecurityPage = lazy(() => import('./pages/SafetySecurityPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const DemandHeatmapsPage = lazy(() => import('./pages/DemandHeatmapsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PaymentMethodsPage = lazy(() => import('./pages/PaymentMethodsPage'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl tracking-widest uppercase opacity-70">Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/payments" element={<PaymentMethodsPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ai-dispatch" 
            element={
              <ProtectedRoute>
                <AIDispatchPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/fleet" 
            element={
              <ProtectedRoute>
                <FleetPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/safety" 
            element={
              <ProtectedRoute>
                <SafetySecurityPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/demand-heatmaps" 
            element={
              <ProtectedRoute>
                <DemandHeatmapsPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
