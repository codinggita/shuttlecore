import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import EmergencyNotification from './components/EmergencyNotification';
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
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ClusterNorthPlazaPage = lazy(() => import("./pages/ClusterNorthPlazaPage"));
const ClusterMissionHubPage = lazy(() => import("./pages/ClusterMissionHubPage"));
const ClusterSunsetTerracePage = lazy(() => import("./pages/ClusterSunsetTerracePage"));
const SimulationDetailsPage = lazy(() => import("./pages/SimulationDetailsPage"));
const DeployUnitsPage = lazy(() => import("./pages/DeployUnitsPage"));
const ManageDeploymentPage = lazy(() => import("./pages/ManageDeploymentPage"));
const AddUnitPage = lazy(() => import("./pages/AddUnitPage"));
const ApplyRecommendationPage = lazy(() => import("./pages/ApplyRecommendationPage"));
const FinalizeNoShowPage = lazy(() => import("./pages/FinalizeNoShowPage"));
const RiderDetailsPage = lazy(() => import("./pages/RiderDetailsPage"));
const NotifyNextStopPage = lazy(() => import("./pages/NotifyNextStopPage"));
const IncidentReportPage = lazy(() => import("./pages/IncidentReportPage"));
const EventLogPage = lazy(() => import("./pages/EventLogPage"));
const DriverDetailsPage = lazy(() => import("./pages/DriverDetailsPage"));
const SafetyHistoryPage = lazy(() => import("./pages/SafetyHistoryPage"));
const AllDriversPage = lazy(() => import("./pages/AllDriversPage"));
const FleetAdjustmentPage = lazy(() => import("./pages/FleetAdjustmentPage"));
const EmergencyStopPage = lazy(() => import("./pages/EmergencyStopPage"));
const BookMyRidePage = lazy(() => import("./pages/BookMyRidePage"));
const VehicleSelectionPage = lazy(() => import("./pages/VehicleSelectionPage"));
const VehicleDetailPage = lazy(() => import("./pages/VehicleDetailPage"));
const BookingConfirmationPage = lazy(() => import("./pages/BookingConfirmationPage"));
const RideHistoryPage = lazy(() => import("./pages/RideHistoryPage"));
const RideOptionDetailPage = lazy(() => import("./pages/RideOptionDetailPage"));

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

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
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cluster-north-plaza" element={<ClusterNorthPlazaPage />} />
          <Route path="/cluster-mission-hub" element={<ClusterMissionHubPage />} />
          <Route path="/cluster-sunset-terrace" element={<ClusterSunsetTerracePage />} />
          <Route path="/simulation-details" element={<SimulationDetailsPage />} />
          <Route path="/deploy-units" element={<DeployUnitsPage />} />
          <Route path="/manage-deployment" element={<ManageDeploymentPage />} />
          <Route path="/add-unit" element={<AddUnitPage />} />
          <Route path="/apply-recommendation" element={<ApplyRecommendationPage />} />
          <Route path="/finalize-no-show" element={<FinalizeNoShowPage />} />
          <Route path="/rider-details" element={<RiderDetailsPage />} />
          <Route path="/notify-next-stop" element={<NotifyNextStopPage />} />
          <Route path="/incident-report" element={<IncidentReportPage />} />
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
          <Route 
            path="/event-log" 
            element={
              <ProtectedRoute>
                <EventLogPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/driver-details/:driverName" 
            element={
              <ProtectedRoute>
                <DriverDetailsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/safety-history" 
            element={
              <ProtectedRoute>
                <SafetyHistoryPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/all-drivers" 
            element={
              <ProtectedRoute>
                <AllDriversPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/fleet-adjustment" 
            element={
              <ProtectedRoute>
                <FleetAdjustmentPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/emergency" 
            element={
              <ProtectedRoute>
                <EmergencyStopPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/book-ride" 
            element={
              <ProtectedRoute>
                <BookMyRidePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vehicle-selection" 
            element={
              <ProtectedRoute>
                <VehicleSelectionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vehicle/:vehicleId" 
            element={
              <ProtectedRoute>
                <VehicleDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/booking-confirmation" 
            element={
              <ProtectedRoute>
                <BookingConfirmationPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ride-history" 
            element={
              <ProtectedRoute>
                <RideHistoryPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ride-option/:rideId" 
            element={
              <ProtectedRoute>
                <RideOptionDetailPage />
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
        <ScrollToTop />
        <EmergencyNotification />
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
