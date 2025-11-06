import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import MapPage from './pages/MapPage';
import ReportPage from './pages/ReportPage';
import NotificationsPage from './pages/NotificationsPage';
import ServicesPage from './pages/ServicesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/map"
          element={
            isAuthenticated ? (
              <Layout>
                <MapPage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/report"
          element={
            isAuthenticated ? (
              <Layout>
                <ReportPage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/notifications"
          element={
            isAuthenticated ? (
              <Layout>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/services"
          element={
            isAuthenticated ? (
              <Layout>
                <ServicesPage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Layout>
                <ProfilePage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

