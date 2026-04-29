import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AIDispatchPage from './pages/AIDispatchPage';
import FleetPage from './pages/FleetPage';
import SafetySecurityPage from './pages/SafetySecurityPage';
import NotificationsPage from './pages/NotificationsPage';
import DemandHeatmapsPage from './pages/DemandHeatmapsPage';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
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
